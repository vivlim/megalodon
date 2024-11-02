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
import { v4 as uuid } from 'uuid';
import { EventEmitter } from 'events';
import FirefishAPI from './api_client';
import { UnknownNotificationTypeError } from '../notification';
import { isBrowser } from '../default';
var WebSocket = (function (_super) {
    __extends(WebSocket, _super);
    function WebSocket(url, channel, accessToken, listId, userAgent) {
        var _this = _super.call(this) || this;
        _this.listId = null;
        _this._client = null;
        _this._heartbeatInterval = 60000;
        _this._pongWaiting = false;
        _this.url = url;
        _this.parser = new Parser();
        _this.channel = channel;
        _this.headers = {
            'User-Agent': userAgent
        };
        if (listId === undefined) {
            _this.listId = null;
        }
        else {
            _this.listId = listId;
        }
        _this._accessToken = accessToken;
        _this._reconnectInterval = 10000;
        _this._reconnectMaxAttempts = Infinity;
        _this._reconnectCurrentAttempts = 0;
        _this._connectionClosed = false;
        _this._channelID = uuid();
        _this._pongReceivedTimestamp = dayjs();
        return _this;
    }
    WebSocket.prototype.start = function () {
        this._connectionClosed = false;
        this._resetRetryParams();
        this._startWebSocketConnection();
    };
    WebSocket.prototype._startWebSocketConnection = function () {
        this._resetConnection();
        this._setupParser();
        this._client = this._connect();
        this._bindSocket(this._client);
    };
    WebSocket.prototype.stop = function () {
        this._connectionClosed = true;
        this._resetConnection();
        this._resetRetryParams();
    };
    WebSocket.prototype._resetConnection = function () {
        if (this._client) {
            this._client.close(1000);
            this._clearBinding();
            this._client = null;
        }
        if (this.parser) {
            this.parser.removeAllListeners();
        }
    };
    WebSocket.prototype._resetRetryParams = function () {
        this._reconnectCurrentAttempts = 0;
    };
    WebSocket.prototype._connect = function () {
        var requestURL = "".concat(this.url, "?i=").concat(this._accessToken);
        if (isBrowser()) {
            var cli = new WS(requestURL);
            return cli;
        }
        else {
            var options = {
                headers: this.headers
            };
            var cli = new WS(requestURL, options);
            return cli;
        }
    };
    WebSocket.prototype._channel = function () {
        if (!this._client) {
            return;
        }
        switch (this.channel) {
            case 'conversation':
                this._client.send(JSON.stringify({
                    type: 'connect',
                    body: {
                        channel: 'main',
                        id: this._channelID
                    }
                }));
                break;
            case 'user':
                this._client.send(JSON.stringify({
                    type: 'connect',
                    body: {
                        channel: 'main',
                        id: this._channelID
                    }
                }));
                this._client.send(JSON.stringify({
                    type: 'connect',
                    body: {
                        channel: 'homeTimeline',
                        id: this._channelID,
                        params: {
                            withReplies: false
                        }
                    }
                }));
                break;
            case 'list':
                this._client.send(JSON.stringify({
                    type: 'connect',
                    body: {
                        channel: 'userList',
                        id: this._channelID,
                        params: {
                            listId: this.listId,
                            withReplies: false
                        }
                    }
                }));
                break;
            default:
                this._client.send(JSON.stringify({
                    type: 'connect',
                    body: {
                        channel: this.channel,
                        id: this._channelID,
                        params: {
                            withReplies: false
                        }
                    }
                }));
                break;
        }
    };
    WebSocket.prototype._reconnect = function () {
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
                _this._client = _this._connect();
                _this._bindSocket(_this._client);
            }
        }, this._reconnectInterval);
    };
    WebSocket.prototype._clearBinding = function () {
        if (this._client && !isBrowser()) {
            this._client.removeAllListeners('close');
            this._client.removeAllListeners('pong');
            this._client.removeAllListeners('open');
            this._client.removeAllListeners('message');
            this._client.removeAllListeners('error');
        }
    };
    WebSocket.prototype._bindSocket = function (client) {
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
            _this._channel();
            if (!isBrowser()) {
                setTimeout(function () {
                    client.ping('');
                }, 10000);
            }
        };
        client.onmessage = function (event) {
            _this.parser.parse(event, _this._channelID);
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
    WebSocket.prototype._setupParser = function () {
        var _this = this;
        this.parser.on('update', function (note) {
            _this.emit('update', FirefishAPI.Converter.note(note));
        });
        this.parser.on('notification', function (notification) {
            var n = FirefishAPI.Converter.notification(notification);
            if (n instanceof UnknownNotificationTypeError) {
                console.warn("Unknown notification event has received: ".concat(notification));
            }
            else {
                _this.emit('notification', n);
            }
        });
        this.parser.on('conversation', function (note) {
            _this.emit('conversation', FirefishAPI.Converter.noteToConversation(note));
        });
        this.parser.on('error', function (err) {
            _this.emit('parser-error', err);
        });
    };
    WebSocket.prototype._checkAlive = function (timestamp) {
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
    return WebSocket;
}(EventEmitter));
export default WebSocket;
var Parser = (function (_super) {
    __extends(Parser, _super);
    function Parser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Parser.prototype.parse = function (ev, channelID) {
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
        var obj;
        var body;
        try {
            obj = JSON.parse(message);
            if (obj.type !== 'channel') {
                return;
            }
            if (!obj.body) {
                return;
            }
            body = obj.body;
            if (body.id !== channelID) {
                return;
            }
        }
        catch (err) {
            this.emit('error', new Error("Error parsing websocket reply: ".concat(message, ", error message: ").concat(err)));
            return;
        }
        switch (body.type) {
            case 'note':
                this.emit('update', body.body);
                break;
            case 'notification':
                this.emit('notification', body.body);
                break;
            case 'mention': {
                var note = body.body;
                if (note.visibility === 'specified') {
                    this.emit('conversation', note);
                }
                break;
            }
            case 'renote':
            case 'followed':
            case 'follow':
            case 'unfollow':
            case 'receiveFollowRequest':
            case 'meUpdated':
            case 'readAllNotifications':
            case 'readAllUnreadSpecifiedNotes':
            case 'readAllAntennas':
            case 'readAllUnreadMentions':
            case 'unreadNotification':
                break;
            default:
                this.emit('error', new Error("Unknown event has received: ".concat(JSON.stringify(body))));
                break;
        }
    };
    return Parser;
}(EventEmitter));
export { Parser };
