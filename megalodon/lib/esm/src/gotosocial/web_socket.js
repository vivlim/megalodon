var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import WS from 'isomorphic-ws';
import dayjs from 'dayjs';
import { EventEmitter } from 'events';
import GotosocialAPI from './api_client';
import { UnknownNotificationTypeError } from '../notification';
import { isBrowser } from '../default';
var Streaming = (function (_super) {
    __extends(Streaming, _super);
    function Streaming(url, stream, params, accessToken, userAgent) {
        var _this = _super.call(this) || this;
        _this._heartbeatInterval = 60000;
        _this._pongWaiting = false;
        _this.url = url;
        _this.stream = stream;
        if (params === undefined) {
            _this.params = null;
        }
        else {
            _this.params = params;
        }
        _this.parser = new Parser();
        _this.headers = {
            'User-Agent': userAgent
        };
        _this._accessToken = accessToken;
        _this._reconnectInterval = 10000;
        _this._reconnectMaxAttempts = Infinity;
        _this._reconnectCurrentAttempts = 0;
        _this._connectionClosed = false;
        _this._client = null;
        _this._pongReceivedTimestamp = dayjs();
        return _this;
    }
    Streaming.prototype.start = function () {
        this._connectionClosed = false;
        this._resetRetryParams();
        this._startWebSocketConnection();
    };
    Streaming.prototype._startWebSocketConnection = function () {
        this._resetConnection();
        this._setupParser();
        this._client = this._connect(this.url, this.stream, this.params, this._accessToken, this.headers);
        this._bindSocket(this._client);
    };
    Streaming.prototype.stop = function () {
        this._connectionClosed = true;
        this._resetConnection();
        this._resetRetryParams();
    };
    Streaming.prototype._resetConnection = function () {
        if (this._client) {
            this._client.close(1000);
            this._clearBinding();
            this._client = null;
        }
        if (this.parser) {
            this.parser.removeAllListeners();
        }
    };
    Streaming.prototype._resetRetryParams = function () {
        this._reconnectCurrentAttempts = 0;
    };
    Streaming.prototype._reconnect = function () {
        var _this = this;
        setTimeout(function () {
            if (_this._client && _this._client.readyState === WS.CONNECTING) {
                return;
            }
            if (_this._reconnectCurrentAttempts < _this._reconnectMaxAttempts) {
                _this._reconnectCurrentAttempts++;
                _this._clearBinding();
                if (_this._client) {
                    if (isBrowser()) {
                        _this._client.close();
                    }
                    else {
                        _this._client.terminate();
                    }
                }
                console.log('Reconnecting');
                _this._client = _this._connect(_this.url, _this.stream, _this.params, _this._accessToken, _this.headers);
                _this._bindSocket(_this._client);
            }
        }, this._reconnectInterval);
    };
    Streaming.prototype._connect = function (url, stream, params, accessToken, headers) {
        var parameter = ["stream=".concat(stream)];
        if (params) {
            parameter.push(params);
        }
        if (accessToken !== null) {
            parameter.push("access_token=".concat(accessToken));
        }
        var requestURL = "".concat(url, "?").concat(parameter.join('&'));
        if (isBrowser()) {
            var cli = new WS(requestURL);
            return cli;
        }
        else {
            var options = {
                headers: headers
            };
            var cli = new WS(requestURL, options);
            return cli;
        }
    };
    Streaming.prototype._clearBinding = function () {
        if (this._client && !isBrowser()) {
            this._client.removeAllListeners('close');
            this._client.removeAllListeners('pong');
            this._client.removeAllListeners('open');
            this._client.removeAllListeners('message');
            this._client.removeAllListeners('error');
        }
    };
    Streaming.prototype._bindSocket = function (client) {
        var _this = this;
        client.onclose = function (event) {
            if (event.code === 1000) {
                _this.emit('close', {});
            }
            else {
                console.log("Closed connection with ".concat(event.code));
                if (!_this._connectionClosed) {
                    _this._reconnect();
                }
            }
        };
        client.onopen = function (_event) {
            _this.emit('connect', {});
            if (!isBrowser()) {
                setTimeout(function () {
                    client.ping('');
                }, 10000);
            }
        };
        client.onmessage = function (event) {
            _this.parser.parse(event);
        };
        client.onerror = function (event) {
            _this.emit('error', event.error);
        };
        if (!isBrowser()) {
            client.on('pong', function () {
                _this._pongWaiting = false;
                _this.emit('pong', {});
                _this._pongReceivedTimestamp = dayjs();
                setTimeout(function () { return _this._checkAlive(_this._pongReceivedTimestamp); }, _this._heartbeatInterval);
            });
        }
    };
    Streaming.prototype._setupParser = function () {
        var _this = this;
        this.parser.on('update', function (status) {
            _this.emit('update', GotosocialAPI.Converter.status(status));
        });
        this.parser.on('notification', function (notification) {
            var n = GotosocialAPI.Converter.notification(notification);
            if (n instanceof UnknownNotificationTypeError) {
                console.warn("Unknown notification event has received: ".concat(notification));
            }
            else {
                _this.emit('notification', n);
            }
        });
        this.parser.on('delete', function (id) {
            _this.emit('delete', id);
        });
        this.parser.on('status_update', function (status) {
            _this.emit('status_update', GotosocialAPI.Converter.status(status));
        });
        this.parser.on('error', function (err) {
            _this.emit('parser-error', err);
        });
        this.parser.on('heartbeat', function (_) {
            _this.emit('heartbeat', 'heartbeat');
        });
    };
    Streaming.prototype._checkAlive = function (timestamp) {
        var _this = this;
        var now = dayjs();
        if (now.diff(timestamp) > this._heartbeatInterval - 1000 && !this._connectionClosed) {
            if (this._client && this._client.readyState !== WS.CONNECTING) {
                this._pongWaiting = true;
                this._client.ping('');
                setTimeout(function () {
                    if (_this._pongWaiting) {
                        _this._pongWaiting = false;
                        _this._reconnect();
                    }
                }, 10000);
            }
        }
    };
    return Streaming;
}(EventEmitter));
export default Streaming;
var Parser = (function (_super) {
    __extends(Parser, _super);
    function Parser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Parser.prototype.parse = function (ev) {
        var data = ev.data;
        var message = data.toString();
        if (typeof message !== 'string') {
            this.emit('heartbeat', {});
            return;
        }
        if (message === '') {
            this.emit('heartbeat', {});
            return;
        }
        var event = '';
        var payload = '';
        var mes = {};
        try {
            var obj = JSON.parse(message);
            event = obj.event;
            payload = obj.payload;
            mes = JSON.parse(payload);
        }
        catch (err) {
            if (event !== 'delete') {
                this.emit('error', new Error("Error parsing websocket reply: ".concat(message, ", error message: ").concat(err)));
                return;
            }
        }
        switch (event) {
            case 'update':
                this.emit('update', mes);
                break;
            case 'notification':
                this.emit('notification', mes);
                break;
            case 'delete':
                this.emit('delete', payload);
                break;
            case 'status.update':
                this.emit('status_update', mes);
                break;
            default:
                this.emit('error', new Error("Unknown event has received: ".concat(message)));
        }
    };
    return Parser;
}(EventEmitter));
export { Parser };
