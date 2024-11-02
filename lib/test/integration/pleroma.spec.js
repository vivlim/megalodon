"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var pleroma_1 = __importDefault(require("@/pleroma"));
var notification_1 = __importDefault(require("@/notification"));
var notification_2 = __importDefault(require("@/pleroma/notification"));
var axios_1 = __importStar(require("axios"));
jest.mock('axios');
var account = {
    id: '1',
    username: 'h3poteto',
    acct: 'h3poteto@pleroma.io',
    display_name: 'h3poteto',
    locked: false,
    noindex: null,
    suspended: null,
    limited: null,
    created_at: '2019-03-26T21:30:32',
    followers_count: 10,
    following_count: 10,
    statuses_count: 100,
    note: 'engineer',
    url: 'https://pleroma.io',
    avatar: '',
    avatar_static: '',
    header: '',
    header_static: '',
    emojis: [],
    moved: null,
    fields: [],
    bot: false,
    source: {
        privacy: null,
        sensitive: false,
        language: null,
        note: 'test',
        fields: []
    }
};
var status = {
    id: '1',
    uri: 'http://example.com',
    url: 'http://example.com',
    account: account,
    in_reply_to_id: null,
    in_reply_to_account_id: null,
    reblog: null,
    content: 'hoge',
    created_at: '2019-03-26T21:40:32',
    edited_at: null,
    emojis: [],
    replies_count: 0,
    reblogs_count: 0,
    favourites_count: 0,
    reblogged: null,
    favourited: null,
    muted: null,
    sensitive: false,
    spoiler_text: '',
    visibility: 'public',
    media_attachments: [],
    mentions: [],
    tags: [],
    card: null,
    poll: null,
    application: {
        name: 'Web'
    },
    language: null,
    pinned: null,
    bookmarked: false,
    pleroma: {
        local: false
    }
};
var follow = {
    account: account,
    created_at: '2021-01-31T23:33:26',
    id: '1',
    type: notification_2.default.Follow
};
var favourite = {
    account: account,
    created_at: '2021-01-31T23:33:26',
    id: '2',
    type: notification_2.default.Favourite,
    status: status
};
var mention = {
    account: account,
    created_at: '2021-01-31T23:33:26',
    id: '3',
    type: notification_2.default.Mention,
    status: status
};
var reblog = {
    account: account,
    created_at: '2021-01-31T23:33:26',
    id: '4',
    type: notification_2.default.Reblog,
    status: status
};
var poll = {
    account: account,
    created_at: '2021-01-31T23:33:26',
    id: '5',
    type: notification_2.default.Poll,
    status: status
};
var emojiReaction = {
    account: account,
    created_at: '2021-01-31T23:33:26',
    id: '6',
    type: notification_2.default.PleromaEmojiReaction,
    status: status,
    emoji: '♥'
};
var unknownEvent = {
    account: account,
    created_at: '2021-01-31T23:33:26',
    id: '8',
    type: 'unknown'
};
var followRequest = {
    account: account,
    created_at: '2021-01-31T23:33:26',
    id: '7',
    type: notification_2.default.FollowRequest
};
axios_1.default.CancelToken.source.mockImplementation(function () {
    return {
        token: {
            throwIfRequested: function () { },
            promise: {
                then: function () { },
                catch: function () { }
            }
        }
    };
});
describe('getNotifications', function () {
    var client = new pleroma_1.default('http://localhost', 'sample token');
    var cases = [
        {
            event: follow,
            expected: notification_1.default.Follow,
            title: 'follow'
        },
        {
            event: favourite,
            expected: notification_1.default.Favourite,
            title: 'favourite'
        },
        {
            event: mention,
            expected: notification_1.default.Mention,
            title: 'mention'
        },
        {
            event: reblog,
            expected: notification_1.default.Reblog,
            title: 'reblog'
        },
        {
            event: poll,
            expected: notification_1.default.PollExpired,
            title: 'poll'
        },
        {
            event: emojiReaction,
            expected: notification_1.default.Reaction,
            title: 'emojiReaction'
        },
        {
            event: followRequest,
            expected: notification_1.default.FollowRequest,
            title: 'followRequest'
        }
    ];
    cases.forEach(function (c) {
        it("should be ".concat(c.title, " event"), function () { return __awaiter(void 0, void 0, void 0, function () {
            var config, mockResponse, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = {
                            headers: new axios_1.AxiosHeaders()
                        };
                        mockResponse = {
                            data: [c.event],
                            status: 200,
                            statusText: '200OK',
                            headers: {},
                            config: config
                        };
                        axios_1.default.get.mockResolvedValue(mockResponse);
                        return [4, client.getNotifications()];
                    case 1:
                        res = _a.sent();
                        expect(res.data[0].type).toEqual(c.expected);
                        return [2];
                }
            });
        }); });
    });
    it('UnknownEvent should be ignored', function () { return __awaiter(void 0, void 0, void 0, function () {
        var config, mockResponse, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config = {
                        headers: new axios_1.AxiosHeaders()
                    };
                    mockResponse = {
                        data: [unknownEvent],
                        status: 200,
                        statusText: '200OK',
                        headers: {},
                        config: config
                    };
                    axios_1.default.get.mockResolvedValue(mockResponse);
                    return [4, client.getNotifications()];
                case 1:
                    res = _a.sent();
                    expect(res.data).toEqual([]);
                    return [2];
            }
        });
    }); });
});