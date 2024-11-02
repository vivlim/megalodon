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
import Pleroma from './pleroma';
import Mastodon from './mastodon';
import Friendica from './friendica';
import Firefish from './firefish';
import Gotosocial from './gotosocial';
var NotImplementedError = (function (_super) {
    __extends(NotImplementedError, _super);
    function NotImplementedError(err) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, err) || this;
        _this.name = _newTarget.name;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return NotImplementedError;
}(Error));
export { NotImplementedError };
var ArgumentError = (function (_super) {
    __extends(ArgumentError, _super);
    function ArgumentError(err) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, err) || this;
        _this.name = _newTarget.name;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return ArgumentError;
}(Error));
export { ArgumentError };
var UnexpectedError = (function (_super) {
    __extends(UnexpectedError, _super);
    function UnexpectedError(err) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, err) || this;
        _this.name = _newTarget.name;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return UnexpectedError;
}(Error));
export { UnexpectedError };
var NodeinfoError = (function (_super) {
    __extends(NodeinfoError, _super);
    function NodeinfoError(err) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, err) || this;
        _this.name = _newTarget.name;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return NodeinfoError;
}(Error));
export { NodeinfoError };
var generator = function (sns, baseUrl, accessToken, userAgent) {
    if (accessToken === void 0) { accessToken = null; }
    if (userAgent === void 0) { userAgent = null; }
    switch (sns) {
        case 'pleroma': {
            var pleroma = new Pleroma(baseUrl, accessToken, userAgent);
            return pleroma;
        }
        case 'friendica': {
            var friendica = new Friendica(baseUrl, accessToken, userAgent);
            return friendica;
        }
        case 'mastodon': {
            var mastodon = new Mastodon(baseUrl, accessToken, userAgent);
            return mastodon;
        }
        case 'firefish': {
            var firefish = new Firefish(baseUrl, accessToken, userAgent);
            return firefish;
        }
        case 'gotosocial': {
            var gotosocial = new Gotosocial(baseUrl, accessToken, userAgent);
            return gotosocial;
        }
    }
};
export default generator;
