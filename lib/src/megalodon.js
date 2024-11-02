"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeinfoError = exports.UnexpectedError = exports.ArgumentError = exports.NotImplementedError = void 0;
var pleroma_1 = __importDefault(require("./pleroma"));
var mastodon_1 = __importDefault(require("./mastodon"));
var friendica_1 = __importDefault(require("./friendica"));
var firefish_1 = __importDefault(require("./firefish"));
var gotosocial_1 = __importDefault(require("./gotosocial"));
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
exports.NotImplementedError = NotImplementedError;
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
exports.ArgumentError = ArgumentError;
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
exports.UnexpectedError = UnexpectedError;
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
exports.NodeinfoError = NodeinfoError;
var generator = function (sns, baseUrl, accessToken, userAgent) {
    if (accessToken === void 0) { accessToken = null; }
    if (userAgent === void 0) { userAgent = null; }
    switch (sns) {
        case 'pleroma': {
            var pleroma = new pleroma_1.default(baseUrl, accessToken, userAgent);
            return pleroma;
        }
        case 'friendica': {
            var friendica = new friendica_1.default(baseUrl, accessToken, userAgent);
            return friendica;
        }
        case 'mastodon': {
            var mastodon = new mastodon_1.default(baseUrl, accessToken, userAgent);
            return mastodon;
        }
        case 'firefish': {
            var firefish = new firefish_1.default(baseUrl, accessToken, userAgent);
            return firefish;
        }
        case 'gotosocial': {
            var gotosocial = new gotosocial_1.default(baseUrl, accessToken, userAgent);
            return gotosocial;
        }
    }
};
exports.default = generator;
