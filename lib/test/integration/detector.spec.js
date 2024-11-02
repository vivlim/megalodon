"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../src/index");
describe('detector', function () {
    describe('mastodon', function () {
        var url = 'https://mastodon.social';
        it('should be mastodon', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mastodon;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, (0, index_1.detector)(url)];
                    case 1:
                        mastodon = _a.sent();
                        expect(mastodon).toEqual('mastodon');
                        return [2];
                }
            });
        }); });
    });
    describe('pleroma', function () {
        var url = 'https://pleroma.io';
        it('should be pleroma', function () { return __awaiter(void 0, void 0, void 0, function () {
            var pleroma;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, (0, index_1.detector)(url)];
                    case 1:
                        pleroma = _a.sent();
                        expect(pleroma).toEqual('pleroma');
                        return [2];
                }
            });
        }); });
    });
    describe('fedibird', function () {
        var url = 'https://fedibird.com';
        it('should be mastodon', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fedibird;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, (0, index_1.detector)(url)];
                    case 1:
                        fedibird = _a.sent();
                        expect(fedibird).toEqual('mastodon');
                        return [2];
                }
            });
        }); }, 20000);
    });
    describe('friendica', function () {
        var url = 'https://squeet.me';
        it('should be friendica', function () { return __awaiter(void 0, void 0, void 0, function () {
            var friendica;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, (0, index_1.detector)(url)];
                    case 1:
                        friendica = _a.sent();
                        expect(friendica).toEqual('friendica');
                        return [2];
                }
            });
        }); });
    });
    describe('akkoma', function () {
        var url = 'https://blob.cat';
        it('should be akkoma', function () { return __awaiter(void 0, void 0, void 0, function () {
            var akkoma;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, (0, index_1.detector)(url)];
                    case 1:
                        akkoma = _a.sent();
                        expect(akkoma).toEqual('pleroma');
                        return [2];
                }
            });
        }); });
    });
    describe('firefish', function () {
        var url = 'https://cybre.club';
        it('should be firefish', function () { return __awaiter(void 0, void 0, void 0, function () {
            var firefish;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, (0, index_1.detector)(url)];
                    case 1:
                        firefish = _a.sent();
                        expect(firefish).toEqual('firefish');
                        return [2];
                }
            });
        }); });
    });
    describe('gotosocial', function () {
        var url = 'https://scg.owu.one';
        it('should be gotosocial', function () { return __awaiter(void 0, void 0, void 0, function () {
            var gotosocial;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, (0, index_1.detector)(url)];
                    case 1:
                        gotosocial = _a.sent();
                        expect(gotosocial).toEqual('gotosocial');
                        return [2];
                }
            });
        }); });
    });
    describe('kmy.blue', function () {
        var url = 'https://kmy.blue';
        it('should be mastodon', function () { return __awaiter(void 0, void 0, void 0, function () {
            var kmyblue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, (0, index_1.detector)(url)];
                    case 1:
                        kmyblue = _a.sent();
                        expect(kmyblue).toEqual('mastodon');
                        return [2];
                }
            });
        }); });
    });
    describe('unknown', function () {
        var url = 'https://google.com';
        it('should be null', function () { return __awaiter(void 0, void 0, void 0, function () {
            var unknown;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        unknown = (0, index_1.detector)(url);
                        return [4, expect(unknown).rejects.toThrow()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }); });
    });
});
