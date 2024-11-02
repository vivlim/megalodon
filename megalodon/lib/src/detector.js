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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detector = void 0;
var axios_1 = __importDefault(require("axios"));
var megalodon_1 = require("./megalodon");
var NODEINFO_10 = 'http://nodeinfo.diaspora.software/ns/schema/1.0';
var NODEINFO_20 = 'http://nodeinfo.diaspora.software/ns/schema/2.0';
var NODEINFO_21 = 'http://nodeinfo.diaspora.software/ns/schema/2.1';
var detector = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var options, res, link, _a, res_1, res_2, res_3;
    var _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                options = {
                    timeout: 20000
                };
                return [4, axios_1.default.get(url + '/.well-known/nodeinfo', options)];
            case 1:
                res = _e.sent();
                link = res.data.links.find(function (l) { return l.rel === NODEINFO_20 || l.rel === NODEINFO_21; });
                if (!link)
                    throw new megalodon_1.NodeinfoError('Could not find nodeinfo');
                _a = link.rel;
                switch (_a) {
                    case NODEINFO_10: return [3, 2];
                    case NODEINFO_20: return [3, 4];
                    case NODEINFO_21: return [3, 6];
                }
                return [3, 8];
            case 2: return [4, axios_1.default.get(link.href, options)];
            case 3:
                res_1 = _e.sent();
                switch (res_1.data.software.name) {
                    case 'pleroma':
                        return [2, 'pleroma'];
                    case 'akkoma':
                        return [2, 'pleroma'];
                    case 'mastodon':
                        return [2, 'mastodon'];
                    case 'friendica':
                        return [2, 'friendica'];
                    case 'firefish':
                        return [2, 'firefish'];
                    case 'iceshrimp':
                        return [2, 'firefish'];
                    case 'gotosocial':
                        return [2, 'gotosocial'];
                    default:
                        if (((_b = res_1.data.metadata.upstream) === null || _b === void 0 ? void 0 : _b.name) && res_1.data.metadata.upstream.name.toLowerCase() === 'mastodon') {
                            return [2, 'mastodon'];
                        }
                        throw new megalodon_1.NodeinfoError('Unknown SNS');
                }
                _e.label = 4;
            case 4: return [4, axios_1.default.get(link.href, options)];
            case 5:
                res_2 = _e.sent();
                switch (res_2.data.software.name) {
                    case 'pleroma':
                        return [2, 'pleroma'];
                    case 'akkoma':
                        return [2, 'pleroma'];
                    case 'mastodon':
                        return [2, 'mastodon'];
                    case 'friendica':
                        return [2, 'friendica'];
                    case 'firefish':
                        return [2, 'firefish'];
                    case 'iceshrimp':
                        return [2, 'firefish'];
                    case 'gotosocial':
                        return [2, 'gotosocial'];
                    default:
                        if (((_c = res_2.data.metadata.upstream) === null || _c === void 0 ? void 0 : _c.name) && res_2.data.metadata.upstream.name.toLowerCase() === 'mastodon') {
                            return [2, 'mastodon'];
                        }
                        throw new megalodon_1.NodeinfoError('Unknown SNS');
                }
                _e.label = 6;
            case 6: return [4, axios_1.default.get(link.href, options)];
            case 7:
                res_3 = _e.sent();
                switch (res_3.data.software.name) {
                    case 'pleroma':
                        return [2, 'pleroma'];
                    case 'akkoma':
                        return [2, 'pleroma'];
                    case 'mastodon':
                        return [2, 'mastodon'];
                    case 'friendica':
                        return [2, 'friendica'];
                    case 'firefish':
                        return [2, 'firefish'];
                    case 'iceshrimp':
                        return [2, 'firefish'];
                    case 'gotosocial':
                        return [2, 'gotosocial'];
                    default:
                        if (((_d = res_3.data.metadata.upstream) === null || _d === void 0 ? void 0 : _d.name) && res_3.data.metadata.upstream.name.toLowerCase() === 'mastodon') {
                            return [2, 'mastodon'];
                        }
                        throw new megalodon_1.NodeinfoError('Unknown SNS');
                }
                _e.label = 8;
            case 8: throw new megalodon_1.NodeinfoError('Could not find nodeinfo');
        }
    });
}); };
exports.detector = detector;
