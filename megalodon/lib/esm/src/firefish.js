var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
import FormData from 'form-data';
import FirefishAPI from './firefish/api_client';
import { DEFAULT_UA } from './default';
import * as FirefishOAuth from './firefish/oauth';
import { NotImplementedError, ArgumentError, UnexpectedError } from './megalodon';
import { UnknownNotificationTypeError } from './notification';
var Firefish = (function () {
    function Firefish(baseUrl, accessToken, userAgent) {
        if (accessToken === void 0) { accessToken = null; }
        if (userAgent === void 0) { userAgent = DEFAULT_UA; }
        var token = '';
        if (accessToken) {
            token = accessToken;
        }
        var agent = DEFAULT_UA;
        if (userAgent) {
            agent = userAgent;
        }
        this.client = new FirefishAPI.Client(baseUrl, token, agent);
        this.baseUrl = baseUrl;
    }
    Firefish.prototype.cancel = function () {
        return this.client.cancel();
    };
    Firefish.prototype.registerApp = function (client_name_1) {
        return __awaiter(this, arguments, void 0, function (client_name, options) {
            var _this = this;
            if (options === void 0) { options = {
                scopes: FirefishAPI.DEFAULT_SCOPE,
                redirect_uris: this.baseUrl
            }; }
            return __generator(this, function (_a) {
                return [2, this.createApp(client_name, options).then(function (appData) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2, this.generateAuthUrlAndToken(appData.client_secret).then(function (session) {
                                    appData.url = session.url;
                                    appData.session_token = session.token;
                                    return appData;
                                })];
                        });
                    }); })];
            });
        });
    };
    Firefish.prototype.createApp = function (client_name_1) {
        return __awaiter(this, arguments, void 0, function (client_name, options) {
            var redirect_uris, scopes, params;
            if (options === void 0) { options = {
                scopes: FirefishAPI.DEFAULT_SCOPE,
                redirect_uris: this.baseUrl
            }; }
            return __generator(this, function (_a) {
                redirect_uris = options.redirect_uris || this.baseUrl;
                scopes = options.scopes || FirefishAPI.DEFAULT_SCOPE;
                params = {
                    name: client_name,
                    description: '',
                    permission: scopes,
                    callbackUrl: redirect_uris
                };
                return [2, this.client.post('/api/app/create', params).then(function (res) {
                        return FirefishOAuth.toAppData(res.data);
                    })];
            });
        });
    };
    Firefish.prototype.generateAuthUrlAndToken = function (clientSecret) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client
                        .post('/api/auth/session/generate', {
                        appSecret: clientSecret
                    })
                        .then(function (res) { return res.data; })];
            });
        });
    };
    Firefish.prototype.verifyAppCredentials = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.fetchAccessToken = function (_client_id, client_secret, session_token, _redirect_uri) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client
                        .post('/api/auth/session/userkey', {
                        appSecret: client_secret,
                        token: session_token
                    })
                        .then(function (res) {
                        return FirefishOAuth.toTokenData(res.data);
                    })];
            });
        });
    };
    Firefish.prototype.refreshToken = function (_client_id, _client_secret, _refresh_token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.revokeToken = function (_client_id, _client_secret, _token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.registerAccount = function (_username, _email, _password, _agreement, _locale, _reason) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.verifyAccountCredentials = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.post('/api/i').then(function (res) {
                        return Object.assign(res, {
                            data: FirefishAPI.Converter.userDetail(res.data)
                        });
                    })];
            });
        });
    };
    Firefish.prototype.updateCredentials = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {};
                if (options) {
                    if (options.bot !== undefined) {
                        params = Object.assign(params, {
                            isBot: options.bot
                        });
                    }
                    if (options.display_name) {
                        params = Object.assign(params, {
                            name: options.display_name
                        });
                    }
                    if (options.note) {
                        params = Object.assign(params, {
                            description: options.note
                        });
                    }
                    if (options.locked !== undefined) {
                        params = Object.assign(params, {
                            isLocked: options.locked
                        });
                    }
                    if (options.source) {
                        if (options.source.language) {
                            params = Object.assign(params, {
                                lang: options.source.language
                            });
                        }
                        if (options.source.sensitive) {
                            params = Object.assign(params, {
                                alwaysMarkNsfw: options.source.sensitive
                            });
                        }
                    }
                }
                return [2, this.client.post('/api/i', params).then(function (res) {
                        return Object.assign(res, {
                            data: FirefishAPI.Converter.userDetail(res.data)
                        });
                    })];
            });
        });
    };
    Firefish.prototype.getAccount = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client
                        .post('/api/users/show', {
                        userId: id
                    })
                        .then(function (res) {
                        return Object.assign(res, {
                            data: FirefishAPI.Converter.userDetail(res.data)
                        });
                    })];
            });
        });
    };
    Firefish.prototype.getAccountStatuses = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                if (options && options.pinned) {
                    return [2, this.client
                            .post('/api/users/show', {
                            userId: id
                        })
                            .then(function (res) {
                            if (res.data.pinnedNotes) {
                                return __assign(__assign({}, res), { data: res.data.pinnedNotes.map(function (n) { return FirefishAPI.Converter.note(n); }) });
                            }
                            return __assign(__assign({}, res), { data: [] });
                        })];
                }
                params = {
                    userId: id
                };
                if (options) {
                    if (options.limit) {
                        params = Object.assign(params, {
                            limit: options.limit
                        });
                    }
                    if (options.max_id) {
                        params = Object.assign(params, {
                            untilId: options.max_id
                        });
                    }
                    if (options.since_id) {
                        params = Object.assign(params, {
                            sinceId: options.since_id
                        });
                    }
                    if (options.exclude_replies) {
                        params = Object.assign(params, {
                            includeReplies: false
                        });
                    }
                    if (options.exclude_reblogs) {
                        params = Object.assign(params, {
                            includeMyRenotes: false
                        });
                    }
                    if (options.only_media) {
                        params = Object.assign(params, {
                            withFiles: options.only_media
                        });
                    }
                }
                return [2, this.client.post('/api/users/notes', params).then(function (res) {
                        var statuses = res.data.map(function (note) { return FirefishAPI.Converter.note(note); });
                        return Object.assign(res, {
                            data: statuses
                        });
                    })];
            });
        });
    };
    Firefish.prototype.getAccountFavourites = function (_id, _options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.subscribeAccount = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.unsubscribeAccount = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.getAccountFollowers = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {
                    userId: id
                };
                if (options) {
                    if (options.limit) {
                        params = Object.assign(params, {
                            limit: options.limit
                        });
                    }
                }
                return [2, this.client.post('/api/users/followers', params).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (f) { return FirefishAPI.Converter.follower(f); })
                        });
                    })];
            });
        });
    };
    Firefish.prototype.getAccountFollowing = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {
                    userId: id
                };
                if (options) {
                    if (options.limit) {
                        params = Object.assign(params, {
                            limit: options.limit
                        });
                    }
                }
                return [2, this.client.post('/api/users/following', params).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (f) { return FirefishAPI.Converter.following(f); })
                        });
                    })];
            });
        });
    };
    Firefish.prototype.getAccountLists = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.getIdentityProof = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.followAccount = function (id, _options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.post('/api/following/create', {
                            userId: id
                        })];
                    case 1:
                        _a.sent();
                        return [2, this.client
                                .post('/api/users/relation', {
                                userId: id
                            })
                                .then(function (res) {
                                return Object.assign(res, {
                                    data: FirefishAPI.Converter.relation(res.data)
                                });
                            })];
                }
            });
        });
    };
    Firefish.prototype.unfollowAccount = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.post('/api/following/delete', {
                            userId: id
                        })];
                    case 1:
                        _a.sent();
                        return [2, this.client
                                .post('/api/users/relation', {
                                userId: id
                            })
                                .then(function (res) {
                                return Object.assign(res, {
                                    data: FirefishAPI.Converter.relation(res.data)
                                });
                            })];
                }
            });
        });
    };
    Firefish.prototype.blockAccount = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.post('/api/blocking/create', {
                            userId: id
                        })];
                    case 1:
                        _a.sent();
                        return [2, this.client
                                .post('/api/users/relation', {
                                userId: id
                            })
                                .then(function (res) {
                                return Object.assign(res, {
                                    data: FirefishAPI.Converter.relation(res.data)
                                });
                            })];
                }
            });
        });
    };
    Firefish.prototype.unblockAccount = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.post('/api/blocking/delete', {
                            userId: id
                        })];
                    case 1:
                        _a.sent();
                        return [2, this.client
                                .post('/api/users/relation', {
                                userId: id
                            })
                                .then(function (res) {
                                return Object.assign(res, {
                                    data: FirefishAPI.Converter.relation(res.data)
                                });
                            })];
                }
            });
        });
    };
    Firefish.prototype.muteAccount = function (id, _notifications) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.post('/api/mute/create', {
                            userId: id
                        })];
                    case 1:
                        _a.sent();
                        return [2, this.client
                                .post('/api/users/relation', {
                                userId: id
                            })
                                .then(function (res) {
                                return Object.assign(res, {
                                    data: FirefishAPI.Converter.relation(res.data)
                                });
                            })];
                }
            });
        });
    };
    Firefish.prototype.unmuteAccount = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.post('/api/mute/delete', {
                            userId: id
                        })];
                    case 1:
                        _a.sent();
                        return [2, this.client
                                .post('/api/users/relation', {
                                userId: id
                            })
                                .then(function (res) {
                                return Object.assign(res, {
                                    data: FirefishAPI.Converter.relation(res.data)
                                });
                            })];
                }
            });
        });
    };
    Firefish.prototype.pinAccount = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.unpinAccount = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.setAccountNote = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.getRelationship = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client
                        .post('/api/users/relation', {
                        userId: id
                    })
                        .then(function (res) {
                        return Object.assign(res, {
                            data: FirefishAPI.Converter.relation(res.data)
                        });
                    })];
            });
        });
    };
    Firefish.prototype.getRelationships = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, Promise.all(ids.map(function (id) { return _this.getRelationship(id); })).then(function (results) { return (__assign(__assign({}, results[0]), { data: results.map(function (r) { return r.data; }) })); })];
            });
        });
    };
    Firefish.prototype.searchAccount = function (q, options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {
                    query: q,
                    detail: true
                };
                if (options) {
                    if (options.resolve !== undefined) {
                        params = Object.assign(params, {
                            localOnly: options.resolve
                        });
                    }
                    if (options.limit) {
                        params = Object.assign(params, {
                            limit: options.limit
                        });
                    }
                }
                return [2, this.client.post('/api/users/search', params).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (u) { return FirefishAPI.Converter.userDetail(u); })
                        });
                    })];
            });
        });
    };
    Firefish.prototype.lookupAccount = function (_acct) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.getBookmarks = function (_options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.getFavourites = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {};
                if (options) {
                    if (options.limit) {
                        params = Object.assign(params, {
                            limit: options.limit
                        });
                    }
                    if (options.max_id) {
                        params = Object.assign(params, {
                            untilId: options.max_id
                        });
                    }
                    if (options.min_id) {
                        params = Object.assign(params, {
                            sinceId: options.min_id
                        });
                    }
                }
                return [2, this.client.post('/api/i/favorites', params).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (fav) { return FirefishAPI.Converter.note(fav.note); })
                        });
                    })];
            });
        });
    };
    Firefish.prototype.getMutes = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {};
                if (options) {
                    if (options.limit) {
                        params = Object.assign(params, {
                            limit: options.limit
                        });
                    }
                    if (options.max_id) {
                        params = Object.assign(params, {
                            untilId: options.max_id
                        });
                    }
                    if (options.min_id) {
                        params = Object.assign(params, {
                            sinceId: options.min_id
                        });
                    }
                }
                return [2, this.client.post('/api/mute/list', params).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (mute) { return FirefishAPI.Converter.userDetail(mute.mutee); })
                        });
                    })];
            });
        });
    };
    Firefish.prototype.getBlocks = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {};
                if (options) {
                    if (options.limit) {
                        params = Object.assign(params, {
                            limit: options.limit
                        });
                    }
                    if (options.max_id) {
                        params = Object.assign(params, {
                            untilId: options.max_id
                        });
                    }
                    if (options.min_id) {
                        params = Object.assign(params, {
                            sinceId: options.min_id
                        });
                    }
                }
                return [2, this.client.post('/api/blocking/list', params).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (blocking) { return FirefishAPI.Converter.userDetail(blocking.blockee); })
                        });
                    })];
            });
        });
    };
    Firefish.prototype.getDomainBlocks = function (_options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.blockDomain = function (_domain) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.unblockDomain = function (_domain) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.getFilters = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.getFilter = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.createFilter = function (_phrase, _context, _options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.updateFilter = function (_id, _phrase, _context, _options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.deleteFilter = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.report = function (account_id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var category;
            return __generator(this, function (_a) {
                category = 'other';
                return [2, this.client
                        .post('/api/users/report-abuse', {
                        userId: account_id,
                        comment: options.comment
                    })
                        .then(function (res) {
                        return Object.assign(res, {
                            data: {
                                id: '',
                                action_taken: false,
                                action_taken_at: null,
                                comment: options.comment,
                                category: category,
                                forwarded: false,
                                status_ids: null,
                                rule_ids: null
                            }
                        });
                    })];
            });
        });
    };
    Firefish.prototype.getFollowRequests = function (_limit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.post('/api/following/requests/list').then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (r) { return FirefishAPI.Converter.user(r.follower); })
                        });
                    })];
            });
        });
    };
    Firefish.prototype.acceptFollowRequest = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.post('/api/following/requests/accept', {
                            userId: id
                        })];
                    case 1:
                        _a.sent();
                        return [2, this.client
                                .post('/api/users/relation', {
                                userId: id
                            })
                                .then(function (res) {
                                return Object.assign(res, {
                                    data: FirefishAPI.Converter.relation(res.data)
                                });
                            })];
                }
            });
        });
    };
    Firefish.prototype.rejectFollowRequest = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.post('/api/following/requests/reject', {
                            userId: id
                        })];
                    case 1:
                        _a.sent();
                        return [2, this.client
                                .post('/api/users/relation', {
                                userId: id
                            })
                                .then(function (res) {
                                return Object.assign(res, {
                                    data: FirefishAPI.Converter.relation(res.data)
                                });
                            })];
                }
            });
        });
    };
    Firefish.prototype.getEndorsements = function (_options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.getFeaturedTags = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.createFeaturedTag = function (_name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.deleteFeaturedTag = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.getSuggestedTags = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.getPreferences = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, this.client.post('/api/i').then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, _b, _c, _d, _e, _f;
                        var _g;
                        return __generator(this, function (_h) {
                            switch (_h.label) {
                                case 0:
                                    _b = (_a = Object).assign;
                                    _c = [res];
                                    _g = {};
                                    _e = (_d = FirefishAPI.Converter).userPreferences;
                                    _f = [res.data];
                                    return [4, this.getDefaultPostPrivacy()];
                                case 1: return [2, _b.apply(_a, _c.concat([(_g.data = _e.apply(_d, _f.concat([_h.sent()])),
                                            _g)]))];
                            }
                        });
                    }); })];
            });
        });
    };
    Firefish.prototype.getDefaultPostPrivacy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client
                        .post('/api/i/registry/get-unsecure', {
                        key: 'defaultNoteVisibility',
                        scope: ['client', 'base']
                    })
                        .then(function (res) {
                        if (!res.data || (res.data != 'public' && res.data != 'home' && res.data != 'followers' && res.data != 'specified'))
                            return 'public';
                        return FirefishAPI.Converter.visibility(res.data);
                    })
                        .catch(function (_) { return 'public'; })];
            });
        });
    };
    Firefish.prototype.getFollowedTags = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.getSuggestions = function (limit) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {};
                if (limit) {
                    params = Object.assign(params, {
                        limit: limit
                    });
                }
                return [2, this.client
                        .post('/api/users/recommendation', params)
                        .then(function (res) { return (__assign(__assign({}, res), { data: res.data.map(function (u) { return FirefishAPI.Converter.userDetail(u); }) })); })];
            });
        });
    };
    Firefish.prototype.getTag = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.followTag = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.unfollowTag = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.postStatus = function (status, options) {
        return __awaiter(this, void 0, void 0, function () {
            var params, pollParam;
            return __generator(this, function (_a) {
                params = {
                    text: status
                };
                if (options) {
                    if (options.media_ids) {
                        params = Object.assign(params, {
                            fileIds: options.media_ids
                        });
                    }
                    if (options.poll) {
                        pollParam = {
                            choices: options.poll.options,
                            expiresAt: null,
                            expiredAfter: options.poll.expires_in
                        };
                        if (options.poll.multiple !== undefined) {
                            pollParam = Object.assign(pollParam, {
                                multiple: options.poll.multiple
                            });
                        }
                        params = Object.assign(params, {
                            poll: pollParam
                        });
                    }
                    if (options.in_reply_to_id) {
                        params = Object.assign(params, {
                            replyId: options.in_reply_to_id
                        });
                    }
                    if (options.spoiler_text) {
                        params = Object.assign(params, {
                            cw: options.spoiler_text
                        });
                    }
                    if (options.visibility) {
                        params = Object.assign(params, {
                            visibility: FirefishAPI.Converter.encodeVisibility(options.visibility)
                        });
                    }
                    if (options.quote_id) {
                        params = Object.assign(params, {
                            renoteId: options.quote_id
                        });
                    }
                }
                return [2, this.client
                        .post('/api/notes/create', params)
                        .then(function (res) { return (__assign(__assign({}, res), { data: FirefishAPI.Converter.note(res.data.createdNote) })); })];
            });
        });
    };
    Firefish.prototype.getStatus = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client
                        .post('/api/notes/show', {
                        noteId: id
                    })
                        .then(function (res) { return (__assign(__assign({}, res), { data: FirefishAPI.Converter.note(res.data) })); })];
            });
        });
    };
    Firefish.prototype.editStatus = function (_id, _options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.deleteStatus = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.post('/api/notes/delete', {
                        noteId: id
                    })];
            });
        });
    };
    Firefish.prototype.getStatusContext = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {
                    noteId: id
                };
                if (options) {
                    if (options.limit) {
                        params = Object.assign(params, {
                            limit: options.limit
                        });
                    }
                    if (options.max_id) {
                        params = Object.assign(params, {
                            untilId: options.max_id
                        });
                    }
                    if (options.since_id) {
                        params = Object.assign(params, {
                            sinceId: options.since_id
                        });
                    }
                }
                return [2, this.client.post('/api/notes/children', params).then(function (res) {
                        var context = {
                            ancestors: [],
                            descendants: res.data.map(function (n) { return FirefishAPI.Converter.note(n); })
                        };
                        return __assign(__assign({}, res), { data: context });
                    })];
            });
        });
    };
    Firefish.prototype.getStatusSource = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.getStatusRebloggedBy = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client
                        .post('/api/notes/renotes', {
                        noteId: id
                    })
                        .then(function (res) { return (__assign(__assign({}, res), { data: res.data.map(function (n) { return FirefishAPI.Converter.user(n.user); }) })); })];
            });
        });
    };
    Firefish.prototype.getStatusFavouritedBy = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.favouriteStatus = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.post('/api/notes/favorites/create', {
                            noteId: id
                        })];
                    case 1:
                        _a.sent();
                        return [2, this.client
                                .post('/api/notes/show', {
                                noteId: id
                            })
                                .then(function (res) { return (__assign(__assign({}, res), { data: FirefishAPI.Converter.note(res.data) })); })];
                }
            });
        });
    };
    Firefish.prototype.unfavouriteStatus = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.post('/api/notes/favorites/delete', {
                            noteId: id
                        })];
                    case 1:
                        _a.sent();
                        return [2, this.client
                                .post('/api/notes/show', {
                                noteId: id
                            })
                                .then(function (res) { return (__assign(__assign({}, res), { data: FirefishAPI.Converter.note(res.data) })); })];
                }
            });
        });
    };
    Firefish.prototype.reblogStatus = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client
                        .post('/api/notes/create', {
                        renoteId: id
                    })
                        .then(function (res) { return (__assign(__assign({}, res), { data: FirefishAPI.Converter.note(res.data.createdNote) })); })];
            });
        });
    };
    Firefish.prototype.unreblogStatus = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.post('/api/notes/unrenote', {
                            noteId: id
                        })];
                    case 1:
                        _a.sent();
                        return [2, this.client
                                .post('/api/notes/show', {
                                noteId: id
                            })
                                .then(function (res) { return (__assign(__assign({}, res), { data: FirefishAPI.Converter.note(res.data) })); })];
                }
            });
        });
    };
    Firefish.prototype.bookmarkStatus = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.unbookmarkStatus = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.muteStatus = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.unmuteStatus = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.pinStatus = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.post('/api/i/pin', {
                            noteId: id
                        })];
                    case 1:
                        _a.sent();
                        return [2, this.client
                                .post('/api/notes/show', {
                                noteId: id
                            })
                                .then(function (res) { return (__assign(__assign({}, res), { data: FirefishAPI.Converter.note(res.data) })); })];
                }
            });
        });
    };
    Firefish.prototype.unpinStatus = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.post('/api/i/unpin', {
                            noteId: id
                        })];
                    case 1:
                        _a.sent();
                        return [2, this.client
                                .post('/api/notes/show', {
                                noteId: id
                            })
                                .then(function (res) { return (__assign(__assign({}, res), { data: FirefishAPI.Converter.note(res.data) })); })];
                }
            });
        });
    };
    Firefish.prototype.reactionName = function (name) {
        var isUnicodeEmoji = /\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu.test(name);
        if (isUnicodeEmoji) {
            return name;
        }
        return ":".concat(name, ":");
    };
    Firefish.prototype.uploadMedia = function (file, _options) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, headers;
            return __generator(this, function (_a) {
                formData = new FormData();
                formData.append('file', file);
                headers = {};
                if (typeof formData.getHeaders === 'function') {
                    headers = formData.getHeaders();
                }
                return [2, this.client
                        .post('/api/drive/files/create', formData, headers)
                        .then(function (res) { return (__assign(__assign({}, res), { data: FirefishAPI.Converter.file(res.data) })); })];
            });
        });
    };
    Firefish.prototype.getMedia = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.post('/api/drive/files/show', { fileId: id })];
                    case 1:
                        res = _a.sent();
                        return [2, __assign(__assign({}, res), { data: FirefishAPI.Converter.file(res.data) })];
                }
            });
        });
    };
    Firefish.prototype.updateMedia = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {
                    fileId: id
                };
                if (options) {
                    if (options.is_sensitive !== undefined) {
                        params = Object.assign(params, {
                            isSensitive: options.is_sensitive
                        });
                    }
                }
                return [2, this.client
                        .post('/api/drive/files/update', params)
                        .then(function (res) { return (__assign(__assign({}, res), { data: FirefishAPI.Converter.file(res.data) })); })];
            });
        });
    };
    Firefish.prototype.getPoll = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.votePoll = function (_id, choices, status_id) {
        return __awaiter(this, void 0, void 0, function () {
            var params, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!status_id) {
                            return [2, new Promise(function (_, reject) {
                                    var err = new ArgumentError('status_id is required');
                                    reject(err);
                                })];
                        }
                        params = {
                            noteId: status_id,
                            choice: choices[0]
                        };
                        return [4, this.client.post('/api/notes/polls/vote', params)];
                    case 1:
                        _a.sent();
                        return [4, this.client
                                .post('/api/notes/show', {
                                noteId: status_id
                            })
                                .then(function (res) {
                                var note = FirefishAPI.Converter.note(res.data);
                                return __assign(__assign({}, res), { data: note.poll });
                            })];
                    case 2:
                        res = _a.sent();
                        if (!res.data) {
                            return [2, new Promise(function (_, reject) {
                                    var err = new UnexpectedError('poll does not exist');
                                    reject(err);
                                })];
                        }
                        return [2, __assign(__assign({}, res), { data: res.data })];
                }
            });
        });
    };
    Firefish.prototype.getScheduledStatuses = function (_options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.getScheduledStatus = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.scheduleStatus = function (_id, _scheduled_at) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.cancelScheduledStatus = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.getPublicTimeline = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {};
                if (options) {
                    if (options.only_media !== undefined) {
                        params = Object.assign(params, {
                            withFiles: options.only_media
                        });
                    }
                    if (options.limit) {
                        params = Object.assign(params, {
                            limit: options.limit
                        });
                    }
                    if (options.max_id) {
                        params = Object.assign(params, {
                            untilId: options.max_id
                        });
                    }
                    if (options.since_id) {
                        params = Object.assign(params, {
                            sinceId: options.since_id
                        });
                    }
                    if (options.min_id) {
                        params = Object.assign(params, {
                            sinceId: options.min_id
                        });
                    }
                }
                return [2, this.client
                        .post('/api/notes/global-timeline', params)
                        .then(function (res) { return (__assign(__assign({}, res), { data: res.data.map(function (n) { return FirefishAPI.Converter.note(n); }) })); })];
            });
        });
    };
    Firefish.prototype.getLocalTimeline = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {};
                if (options) {
                    if (options.only_media !== undefined) {
                        params = Object.assign(params, {
                            withFiles: options.only_media
                        });
                    }
                    if (options.limit) {
                        params = Object.assign(params, {
                            limit: options.limit
                        });
                    }
                    if (options.max_id) {
                        params = Object.assign(params, {
                            untilId: options.max_id
                        });
                    }
                    if (options.since_id) {
                        params = Object.assign(params, {
                            sinceId: options.since_id
                        });
                    }
                    if (options.min_id) {
                        params = Object.assign(params, {
                            sinceId: options.min_id
                        });
                    }
                }
                return [2, this.client
                        .post('/api/notes/local-timeline', params)
                        .then(function (res) { return (__assign(__assign({}, res), { data: res.data.map(function (n) { return FirefishAPI.Converter.note(n); }) })); })];
            });
        });
    };
    Firefish.prototype.getTagTimeline = function (hashtag, options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {
                    tag: hashtag
                };
                if (options) {
                    if (options.only_media !== undefined) {
                        params = Object.assign(params, {
                            withFiles: options.only_media
                        });
                    }
                    if (options.limit) {
                        params = Object.assign(params, {
                            limit: options.limit
                        });
                    }
                    if (options.max_id) {
                        params = Object.assign(params, {
                            untilId: options.max_id
                        });
                    }
                    if (options.since_id) {
                        params = Object.assign(params, {
                            sinceId: options.since_id
                        });
                    }
                    if (options.min_id) {
                        params = Object.assign(params, {
                            sinceId: options.min_id
                        });
                    }
                }
                return [2, this.client
                        .post('/api/notes/search-by-tag', params)
                        .then(function (res) { return (__assign(__assign({}, res), { data: res.data.map(function (n) { return FirefishAPI.Converter.note(n); }) })); })];
            });
        });
    };
    Firefish.prototype.getHomeTimeline = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {
                    withFiles: false
                };
                if (options) {
                    if (options.limit) {
                        params = Object.assign(params, {
                            limit: options.limit
                        });
                    }
                    if (options.max_id) {
                        params = Object.assign(params, {
                            untilId: options.max_id
                        });
                    }
                    if (options.since_id) {
                        params = Object.assign(params, {
                            sinceId: options.since_id
                        });
                    }
                    if (options.min_id) {
                        params = Object.assign(params, {
                            sinceId: options.min_id
                        });
                    }
                }
                return [2, this.client
                        .post('/api/notes/timeline', params)
                        .then(function (res) { return (__assign(__assign({}, res), { data: res.data.map(function (n) { return FirefishAPI.Converter.note(n); }) })); })];
            });
        });
    };
    Firefish.prototype.getListTimeline = function (list_id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {
                    listId: list_id,
                    withFiles: false
                };
                if (options) {
                    if (options.limit) {
                        params = Object.assign(params, {
                            limit: options.limit
                        });
                    }
                    if (options.max_id) {
                        params = Object.assign(params, {
                            untilId: options.max_id
                        });
                    }
                    if (options.since_id) {
                        params = Object.assign(params, {
                            sinceId: options.since_id
                        });
                    }
                    if (options.min_id) {
                        params = Object.assign(params, {
                            sinceId: options.min_id
                        });
                    }
                }
                return [2, this.client
                        .post('/api/notes/user-list-timeline', params)
                        .then(function (res) { return (__assign(__assign({}, res), { data: res.data.map(function (n) { return FirefishAPI.Converter.note(n); }) })); })];
            });
        });
    };
    Firefish.prototype.getConversationTimeline = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {
                    visibility: 'specified'
                };
                if (options) {
                    if (options.limit) {
                        params = Object.assign(params, {
                            limit: options.limit
                        });
                    }
                    if (options.max_id) {
                        params = Object.assign(params, {
                            untilId: options.max_id
                        });
                    }
                    if (options.since_id) {
                        params = Object.assign(params, {
                            sinceId: options.since_id
                        });
                    }
                    if (options.min_id) {
                        params = Object.assign(params, {
                            sinceId: options.min_id
                        });
                    }
                }
                return [2, this.client
                        .post('/api/notes/mentions', params)
                        .then(function (res) { return (__assign(__assign({}, res), { data: res.data.map(function (n) { return FirefishAPI.Converter.noteToConversation(n); }) })); })];
            });
        });
    };
    Firefish.prototype.deleteConversation = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.readConversation = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.getLists = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client
                        .post('/api/users/lists/list')
                        .then(function (res) { return (__assign(__assign({}, res), { data: res.data.map(function (l) { return FirefishAPI.Converter.list(l); }) })); })];
            });
        });
    };
    Firefish.prototype.getList = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client
                        .post('/api/users/lists/show', {
                        listId: id
                    })
                        .then(function (res) { return (__assign(__assign({}, res), { data: FirefishAPI.Converter.list(res.data) })); })];
            });
        });
    };
    Firefish.prototype.createList = function (title) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client
                        .post('/api/users/lists/create', {
                        name: title
                    })
                        .then(function (res) { return (__assign(__assign({}, res), { data: FirefishAPI.Converter.list(res.data) })); })];
            });
        });
    };
    Firefish.prototype.updateList = function (id, title) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client
                        .post('/api/users/lists/update', {
                        listId: id,
                        name: title
                    })
                        .then(function (res) { return (__assign(__assign({}, res), { data: FirefishAPI.Converter.list(res.data) })); })];
            });
        });
    };
    Firefish.prototype.deleteList = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.post('/api/users/lists/delete', {
                        listId: id
                    })];
            });
        });
    };
    Firefish.prototype.getAccountsInList = function (id, _options) {
        return __awaiter(this, void 0, void 0, function () {
            var res, promise, accounts;
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.client.post('/api/users/lists/show', {
                            listId: id
                        })];
                    case 1:
                        res = _b.sent();
                        promise = (_a = res.data.userIds) === null || _a === void 0 ? void 0 : _a.map(function (userId) { return _this.getAccount(userId); });
                        if (!promise) return [3, 3];
                        return [4, Promise.all(promise)];
                    case 2:
                        accounts = _b.sent();
                        return [2, __assign(__assign({}, res), { data: accounts.map(function (r) { return r.data; }) })];
                    case 3: return [2, __assign(__assign({}, res), { data: [] })];
                }
            });
        });
    };
    Firefish.prototype.addAccountsToList = function (id, account_ids) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.post('/api/users/lists/push', {
                        listId: id,
                        userId: account_ids[0]
                    })];
            });
        });
    };
    Firefish.prototype.deleteAccountsFromList = function (id, account_ids) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.post('/api/users/lists/pull', {
                        listId: id,
                        userId: account_ids[0]
                    })];
            });
        });
    };
    Firefish.prototype.getMarkers = function (_timeline) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.saveMarkers = function (_options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.getNotifications = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var params, res, notifications;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {};
                        if (options) {
                            if (options.limit) {
                                params = Object.assign(params, {
                                    limit: options.limit
                                });
                            }
                            if (options.max_id) {
                                params = Object.assign(params, {
                                    untilId: options.max_id
                                });
                            }
                            if (options.since_id) {
                                params = Object.assign(params, {
                                    sinceId: options.since_id
                                });
                            }
                            if (options.min_id) {
                                params = Object.assign(params, {
                                    sinceId: options.min_id
                                });
                            }
                            if (options.exclude_type) {
                                params = Object.assign(params, {
                                    excludeType: options.exclude_type.map(function (e) { return FirefishAPI.Converter.encodeNotificationType(e); })
                                });
                            }
                        }
                        return [4, this.client.post('/api/i/notifications', params)];
                    case 1:
                        res = _a.sent();
                        notifications = res.data.flatMap(function (n) {
                            var notify = FirefishAPI.Converter.notification(n);
                            if (notify instanceof UnknownNotificationTypeError) {
                                return [];
                            }
                            return notify;
                        });
                        return [2, __assign(__assign({}, res), { data: notifications })];
                }
            });
        });
    };
    Firefish.prototype.getNotification = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.dismissNotifications = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.post('/api/notifications/mark-all-as-read')];
            });
        });
    };
    Firefish.prototype.dismissNotification = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.readNotifications = function (_options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('mastodon does not support');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.subscribePushNotification = function (_subscription, _data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.getPushSubscription = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.updatePushSubscription = function (_data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.deletePushSubscription = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.searchAccounts = function (q, options) {
        return __awaiter(this, void 0, void 0, function () {
            var params, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            query: q
                        };
                        if (options) {
                            if (options.limit) {
                                params = Object.assign(params, {
                                    limit: options.limit
                                });
                            }
                            if (options.offset) {
                                params = Object.assign(params, {
                                    offset: options.offset
                                });
                            }
                            if (options.resolve) {
                                params = Object.assign(params, {
                                    localOnly: options.resolve
                                });
                            }
                        }
                        return [4, this.client.post('/api/users/search', params)];
                    case 1:
                        res = _a.sent();
                        return [2, res.data];
                }
            });
        });
    };
    Firefish.prototype.searchStatuses = function (q, options) {
        return __awaiter(this, void 0, void 0, function () {
            var params, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            query: q
                        };
                        if (options) {
                            if (options.limit) {
                                params = Object.assign(params, {
                                    limit: options.limit
                                });
                            }
                            if (options.offset) {
                                params = Object.assign(params, {
                                    offset: options.offset
                                });
                            }
                            if (options.max_id) {
                                params = Object.assign(params, {
                                    untilId: options.max_id
                                });
                            }
                            if (options.min_id) {
                                params = Object.assign(params, {
                                    sinceId: options.min_id
                                });
                            }
                            if (options.account_id) {
                                params = Object.assign(params, {
                                    userId: options.account_id
                                });
                            }
                        }
                        return [4, this.client.post('/api/notes/search', params)];
                    case 1:
                        res = _a.sent();
                        return [2, res.data];
                }
            });
        });
    };
    Firefish.prototype.searchHashtags = function (q, options) {
        return __awaiter(this, void 0, void 0, function () {
            var params, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            query: q
                        };
                        if (options) {
                            if (options.limit) {
                                params = Object.assign(params, {
                                    limit: options.limit
                                });
                            }
                            if (options.offset) {
                                params = Object.assign(params, {
                                    offset: options.offset
                                });
                            }
                        }
                        return [4, this.client.post('/api/hashtags/search', params)];
                    case 1:
                        res = _a.sent();
                        return [2, res.data];
                }
            });
        });
    };
    Firefish.prototype.searchAll = function (q, options) {
        return __awaiter(this, void 0, void 0, function () {
            var accounts, e_1, statuses, e_2, hashtags, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        accounts = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.searchAccounts(q, options)];
                    case 2:
                        accounts = _a.sent();
                        return [3, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.warn(e_1);
                        return [3, 4];
                    case 4:
                        statuses = [];
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4, this.searchStatuses(q, options)];
                    case 6:
                        statuses = _a.sent();
                        return [3, 8];
                    case 7:
                        e_2 = _a.sent();
                        console.warn(e_2);
                        return [3, 8];
                    case 8:
                        hashtags = [];
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        return [4, this.searchHashtags(q, options)];
                    case 10:
                        hashtags = _a.sent();
                        return [3, 12];
                    case 11:
                        e_3 = _a.sent();
                        console.warn(e_3);
                        return [3, 12];
                    case 12: return [2, {
                            data: {
                                accounts: accounts.map(function (a) { return FirefishAPI.Converter.userDetail(a); }),
                                statuses: statuses.map(function (n) { return FirefishAPI.Converter.note(n); }),
                                hashtags: hashtags.map(function (h) { return ({ name: h, url: h, history: [], following: false }); })
                            },
                            status: 200,
                            statusText: '200',
                            headers: null
                        }];
                }
            });
        });
    };
    Firefish.prototype.search = function (q, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, accounts, statuses, hashtags;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!options) return [3, 9];
                        _a = options.type;
                        switch (_a) {
                            case 'accounts': return [3, 1];
                            case 'statuses': return [3, 3];
                            case 'hashtags': return [3, 5];
                        }
                        return [3, 7];
                    case 1: return [4, this.searchAccounts(q, options)];
                    case 2:
                        accounts = _b.sent();
                        return [2, {
                                data: {
                                    accounts: accounts.map(function (a) { return FirefishAPI.Converter.userDetail(a); }),
                                    statuses: [],
                                    hashtags: []
                                },
                                status: 200,
                                statusText: '200',
                                headers: null
                            }];
                    case 3: return [4, this.searchStatuses(q, options)];
                    case 4:
                        statuses = _b.sent();
                        return [2, {
                                data: {
                                    accounts: [],
                                    statuses: statuses.map(function (n) { return FirefishAPI.Converter.note(n); }),
                                    hashtags: []
                                },
                                status: 200,
                                statusText: '200',
                                headers: null
                            }];
                    case 5: return [4, this.searchHashtags(q, options)];
                    case 6:
                        hashtags = _b.sent();
                        return [2, {
                                data: {
                                    accounts: [],
                                    statuses: [],
                                    hashtags: hashtags.map(function (h) { return ({ name: h, url: h, history: [], following: false }); })
                                },
                                status: 200,
                                statusText: '200',
                                headers: null
                            }];
                    case 7:
                        {
                            return [2, this.searchAll(q, options)];
                        }
                        _b.label = 8;
                    case 8: return [3, 10];
                    case 9: return [2, this.searchAll(q)];
                    case 10: return [2];
                }
            });
        });
    };
    Firefish.prototype.getInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client
                        .get('/api/v1/instance')
                        .then(function (res) { return (__assign(__assign({}, res), { data: FirefishAPI.Converter.instance(res.data) })); })];
            });
        });
    };
    Firefish.prototype.getInstancePeers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.getInstanceActivity = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.getInstanceTrends = function (_limit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client
                        .post('/api/hashtags/trend')
                        .then(function (res) { return (__assign(__assign({}, res), { data: res.data.map(function (h) { return FirefishAPI.Converter.hashtag(h); }) })); })];
            });
        });
    };
    Firefish.prototype.getInstanceDirectory = function (_options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.getInstanceCustomEmojis = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client
                        .post('/api/meta')
                        .then(function (res) { return (__assign(__assign({}, res), { data: res.data.emojis.map(function (e) { return FirefishAPI.Converter.emoji(e); }) })); })];
            });
        });
    };
    Firefish.prototype.getInstanceAnnouncements = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client
                        .post('/api/announcements')
                        .then(function (res) { return (__assign(__assign({}, res), { data: res.data.map(function (a) { return FirefishAPI.Converter.announcement(a); }) })); })];
            });
        });
    };
    Firefish.prototype.dismissInstanceAnnouncement = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.addReactionToAnnouncement = function (_id, _name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.removeReactionFromAnnouncement = function (_id, _name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.createEmojiReaction = function (id, emoji) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.post('/api/notes/reactions/create', {
                            noteId: id,
                            reaction: this.reactionName(emoji)
                        })];
                    case 1:
                        _a.sent();
                        return [2, this.client
                                .post('/api/notes/show', {
                                noteId: id
                            })
                                .then(function (res) { return (__assign(__assign({}, res), { data: FirefishAPI.Converter.note(res.data) })); })];
                }
            });
        });
    };
    Firefish.prototype.deleteEmojiReaction = function (id, emoji) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.post('/api/notes/reactions/delete', {
                            noteId: id,
                            reaction: this.reactionName(emoji)
                        })];
                    case 1:
                        _a.sent();
                        return [2, this.client
                                .post('/api/notes/show', {
                                noteId: id
                            })
                                .then(function (res) { return (__assign(__assign({}, res), { data: FirefishAPI.Converter.note(res.data) })); })];
                }
            });
        });
    };
    Firefish.prototype.getEmojiReactions = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client
                        .post('/api/notes/reactions', {
                        noteId: id
                    })
                        .then(function (res) { return (__assign(__assign({}, res), { data: FirefishAPI.Converter.reactions(res.data) })); })];
            });
        });
    };
    Firefish.prototype.getEmojiReaction = function (_id, _emoji) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Firefish does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Firefish.prototype.streamingURL = function () {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getInstance()];
                    case 1:
                        instance = _a.sent();
                        if (instance.data.urls) {
                            return [2, instance.data.urls.streaming_api];
                        }
                        return [2, this.baseUrl];
                }
            });
        });
    };
    Firefish.prototype.userStreaming = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.streamingURL()];
                    case 1:
                        url = _a.sent();
                        return [2, this.client.socket(url, 'user')];
                }
            });
        });
    };
    Firefish.prototype.publicStreaming = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.streamingURL()];
                    case 1:
                        url = _a.sent();
                        return [2, this.client.socket(url, 'globalTimeline')];
                }
            });
        });
    };
    Firefish.prototype.localStreaming = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.streamingURL()];
                    case 1:
                        url = _a.sent();
                        return [2, this.client.socket(url, 'localTimeline')];
                }
            });
        });
    };
    Firefish.prototype.tagStreaming = function (_tag) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new NotImplementedError('TODO: implement');
            });
        });
    };
    Firefish.prototype.listStreaming = function (list_id) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.streamingURL()];
                    case 1:
                        url = _a.sent();
                        return [2, this.client.socket(url, 'list', list_id)];
                }
            });
        });
    };
    Firefish.prototype.directStreaming = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.streamingURL()];
                    case 1:
                        url = _a.sent();
                        return [2, this.client.socket(url, 'conversation')];
                }
            });
        });
    };
    return Firefish;
}());
export default Firefish;
