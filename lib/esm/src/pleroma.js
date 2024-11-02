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
import { OAuth2Client } from '@badgateway/oauth2-client';
import FormData from 'form-data';
import PleromaAPI from './pleroma/api_client';
import { NotImplementedError, ArgumentError } from './megalodon';
import { NO_REDIRECT, DEFAULT_SCOPE, DEFAULT_UA } from './default';
import * as PleromaOAuth from './pleroma/oauth';
import { UnknownNotificationTypeError } from './notification';
var Pleroma = (function () {
    function Pleroma(baseUrl, accessToken, userAgent) {
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
        this.client = new PleromaAPI.Client(baseUrl, token, agent);
        this.baseUrl = baseUrl;
    }
    Pleroma.prototype.cancel = function () {
        return this.client.cancel();
    };
    Pleroma.prototype.registerApp = function (client_name, options) {
        return __awaiter(this, void 0, void 0, function () {
            var scopes;
            var _this = this;
            return __generator(this, function (_a) {
                scopes = options.scopes || DEFAULT_SCOPE;
                return [2, this.createApp(client_name, options).then(function (appData) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2, this.generateAuthUrl(appData.client_id, appData.client_secret, {
                                    scope: scopes,
                                    redirect_uri: appData.redirect_uri
                                }).then(function (url) {
                                    appData.url = url;
                                    return appData;
                                })];
                        });
                    }); })];
            });
        });
    };
    Pleroma.prototype.createApp = function (client_name, options) {
        return __awaiter(this, void 0, void 0, function () {
            var scopes, redirect_uris, params;
            return __generator(this, function (_a) {
                scopes = options.scopes || DEFAULT_SCOPE;
                redirect_uris = options.redirect_uris || NO_REDIRECT;
                params = {
                    client_name: client_name,
                    redirect_uris: redirect_uris,
                    scopes: scopes.join(' ')
                };
                if (options.website)
                    params.website = options.website;
                return [2, this.client
                        .post('/api/v1/apps', params)
                        .then(function (res) { return PleromaOAuth.toAppData(res.data); })];
            });
        });
    };
    Pleroma.prototype.generateAuthUrl = function (clientId, clientSecret, options) {
        var _this = this;
        var scope = options.scope || DEFAULT_SCOPE;
        var redirect_uri = options.redirect_uri || NO_REDIRECT;
        return new Promise(function (resolve) {
            var oauthClient = new OAuth2Client({
                server: _this.baseUrl,
                clientId: clientId,
                clientSecret: clientSecret,
                tokenEndpoint: '/oauth/token',
                authorizationEndpoint: '/oauth/authorize'
            });
            var url = oauthClient.authorizationCode.getAuthorizeUri({
                redirectUri: redirect_uri,
                scope: scope
            });
            resolve(url);
        });
    };
    Pleroma.prototype.verifyAppCredentials = function () {
        return this.client.get('/api/v1/apps/verify_credentials');
    };
    Pleroma.prototype.fetchAccessToken = function (client_id_1, client_secret_1, code_1) {
        return __awaiter(this, arguments, void 0, function (client_id, client_secret, code, redirect_uri) {
            if (redirect_uri === void 0) { redirect_uri = NO_REDIRECT; }
            return __generator(this, function (_a) {
                if (!client_id) {
                    throw new Error('client_id is required');
                }
                return [2, this.client
                        .post('/oauth/token', {
                        client_id: client_id,
                        client_secret: client_secret,
                        code: code,
                        redirect_uri: redirect_uri,
                        grant_type: 'authorization_code'
                    })
                        .then(function (res) { return PleromaOAuth.toTokenData(res.data); })];
            });
        });
    };
    Pleroma.prototype.refreshToken = function (client_id, client_secret, refresh_token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client
                        .post('/oauth/token', {
                        client_id: client_id,
                        client_secret: client_secret,
                        refresh_token: refresh_token,
                        grant_type: 'refresh_token'
                    })
                        .then(function (res) { return PleromaOAuth.toTokenData(res.data); })];
            });
        });
    };
    Pleroma.prototype.revokeToken = function (client_id, client_secret, token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.post('/oauth/revoke', {
                        client_id: client_id,
                        client_secret: client_secret,
                        token: token
                    })];
            });
        });
    };
    Pleroma.prototype.registerAccount = function (username, email, password, agreement, locale, reason) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {
                    username: username,
                    email: email,
                    password: password,
                    agreement: agreement,
                    locale: locale
                };
                if (reason) {
                    params = Object.assign(params, {
                        reason: reason
                    });
                }
                return [2, this.client.post('/api/v1/accounts', params).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.token(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.verifyAccountCredentials = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.get('/api/v1/accounts/verify_credentials').then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.account(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.updateCredentials = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {};
                if (options) {
                    if (options.discoverable !== undefined) {
                        params = Object.assign(params, {
                            discoverable: options.discoverable
                        });
                    }
                    if (options.bot !== undefined) {
                        params = Object.assign(params, {
                            bot: options.bot
                        });
                    }
                    if (options.display_name) {
                        params = Object.assign(params, {
                            display_name: options.display_name
                        });
                    }
                    if (options.note) {
                        params = Object.assign(params, {
                            note: options.note
                        });
                    }
                    if (options.avatar) {
                        params = Object.assign(params, {
                            avatar: options.avatar
                        });
                    }
                    if (options.header) {
                        params = Object.assign(params, {
                            header: options.header
                        });
                    }
                    if (options.locked !== undefined) {
                        params = Object.assign(params, {
                            locked: options.locked
                        });
                    }
                    if (options.source) {
                        params = Object.assign(params, {
                            source: options.source
                        });
                    }
                    if (options.fields_attributes) {
                        params = Object.assign(params, {
                            fields_attributes: options.fields_attributes
                        });
                    }
                }
                return [2, this.client.patch('/api/v1/accounts/update_credentials', params).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.account(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getAccount = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.get("/api/v1/accounts/".concat(id)).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.account(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getAccountStatuses = function (id, options) {
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
                            max_id: options.max_id
                        });
                    }
                    if (options.since_id) {
                        params = Object.assign(params, {
                            since_id: options.since_id
                        });
                    }
                    if (options.pinned) {
                        params = Object.assign(params, {
                            pinned: options.pinned
                        });
                    }
                    if (options.exclude_replies) {
                        params = Object.assign(params, {
                            exclude_replies: options.exclude_replies
                        });
                    }
                    if (options.exclude_reblogs) {
                        params = Object.assign(params, {
                            exclude_reblogs: options.exclude_reblogs
                        });
                    }
                    if (options.only_media) {
                        params = Object.assign(params, {
                            only_media: options.only_media
                        });
                    }
                }
                return [2, this.client.get("/api/v1/accounts/".concat(id, "/statuses"), params).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (s) { return PleromaAPI.Converter.status(s); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getAccountFavourites = function (id, options) {
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
                            max_id: options.max_id
                        });
                    }
                    if (options.since_id) {
                        params = Object.assign(params, {
                            since_id: options.since_id
                        });
                    }
                }
                return [2, this.client.get("/api/v1/pleroma/accounts/".concat(id, "/favourites"), params).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (s) { return PleromaAPI.Converter.status(s); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.subscribeAccount = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.post("/api/v1/pleroma/accounts/".concat(id, "/subscribe")).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.relationship(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.unsubscribeAccount = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.post("/api/v1/pleroma/accounts/".concat(id, "/unsubscribe")).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.relationship(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getAccountFollowers = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {};
                if (options) {
                    if (options.max_id) {
                        params = Object.assign(params, {
                            max_id: options.max_id
                        });
                    }
                    if (options.since_id) {
                        params = Object.assign(params, {
                            since_id: options.since_id
                        });
                    }
                    if (options.limit) {
                        params = Object.assign(params, {
                            limit: options.limit
                        });
                    }
                }
                return [2, this.client.get("/api/v1/accounts/".concat(id, "/followers"), params).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (a) { return PleromaAPI.Converter.account(a); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getAccountFollowing = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {};
                if (options) {
                    if (options.max_id) {
                        params = Object.assign(params, {
                            max_id: options.max_id
                        });
                    }
                    if (options.since_id) {
                        params = Object.assign(params, {
                            since_id: options.since_id
                        });
                    }
                    if (options.limit) {
                        params = Object.assign(params, {
                            limit: options.limit
                        });
                    }
                }
                return [2, this.client.get("/api/v1/accounts/".concat(id, "/following"), params).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (a) { return PleromaAPI.Converter.account(a); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getAccountLists = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.get("/api/v1/accounts/".concat(id, "/lists")).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (l) { return PleromaAPI.Converter.list(l); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getIdentityProof = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.get("/api/v1/accounts/".concat(id, "/identity_proofs")).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (i) { return PleromaAPI.Converter.identity_proof(i); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.followAccount = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {};
                if (options) {
                    if (options.reblog !== undefined) {
                        params = Object.assign(params, {
                            reblog: options.reblog
                        });
                    }
                }
                return [2, this.client.post("/api/v1/accounts/".concat(id, "/follow"), params).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.relationship(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.unfollowAccount = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.post("/api/v1/accounts/".concat(id, "/unfollow")).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.relationship(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.blockAccount = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.post("/api/v1/accounts/".concat(id, "/block")).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.relationship(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.unblockAccount = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.post("/api/v1/accounts/".concat(id, "/unblock")).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.relationship(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.muteAccount = function (id_1) {
        return __awaiter(this, arguments, void 0, function (id, notifications) {
            if (notifications === void 0) { notifications = true; }
            return __generator(this, function (_a) {
                return [2, this.client
                        .post("/api/v1/accounts/".concat(id, "/mute"), {
                        notifications: notifications
                    })
                        .then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.relationship(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.unmuteAccount = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.post("/api/v1/accounts/".concat(id, "/unmute")).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.relationship(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.pinAccount = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.post("/api/v1/accounts/".concat(id, "/pin")).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.relationship(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.unpinAccount = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.post("/api/v1/accounts/".concat(id, "/unpin")).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.relationship(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.setAccountNote = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Pleroma does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Pleroma.prototype.getRelationship = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client
                        .get('/api/v1/accounts/relationships', {
                        id: [id]
                    })
                        .then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.relationship(res.data[0])
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getRelationships = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client
                        .get('/api/v1/accounts/relationships', {
                        id: ids
                    })
                        .then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (r) { return PleromaAPI.Converter.relationship(r); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.searchAccount = function (q, options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = { q: q };
                if (options) {
                    if (options.following !== undefined && options.following !== null) {
                        params = Object.assign(params, {
                            following: options.following
                        });
                    }
                    if (options.resolve !== undefined && options.resolve !== null) {
                        params = Object.assign(params, {
                            resolve: options.resolve
                        });
                    }
                    if (options.max_id) {
                        params = Object.assign(params, {
                            max_id: options.max_id
                        });
                    }
                    if (options.since_id) {
                        params = Object.assign(params, {
                            since_id: options.since_id
                        });
                    }
                    if (options.limit) {
                        params = Object.assign(params, {
                            limit: options.limit
                        });
                    }
                }
                return [2, this.client.get('/api/v1/accounts/search', params).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (a) { return PleromaAPI.Converter.account(a); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.lookupAccount = function (acct) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.get("/api/v1/accounts/lookup?acct=".concat(acct)).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.account(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getBookmarks = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {};
                if (options) {
                    if (options.max_id) {
                        params = Object.assign(params, {
                            max_id: options.max_id
                        });
                    }
                    if (options.since_id) {
                        params = Object.assign(params, {
                            since_id: options.since_id
                        });
                    }
                    if (options.limit) {
                        params = Object.assign(params, {
                            limit: options.limit
                        });
                    }
                    if (options.min_id) {
                        params = Object.assign(params, {
                            min_id: options.min_id
                        });
                    }
                }
                return [2, this.client.get('/api/v1/bookmarks', params).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (s) { return PleromaAPI.Converter.status(s); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getFavourites = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {};
                if (options) {
                    if (options.min_id) {
                        params = Object.assign(params, {
                            min_id: options.min_id
                        });
                    }
                    if (options.max_id) {
                        params = Object.assign(params, {
                            max_id: options.max_id
                        });
                    }
                    if (options.limit) {
                        params = Object.assign(params, {
                            limit: options.limit
                        });
                    }
                }
                return [2, this.client.get('/api/v1/favourites', params).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (s) { return PleromaAPI.Converter.status(s); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getMutes = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {};
                if (options) {
                    if (options.min_id) {
                        params = Object.assign(params, {
                            min_id: options.min_id
                        });
                    }
                    if (options.max_id) {
                        params = Object.assign(params, {
                            max_id: options.max_id
                        });
                    }
                    if (options.limit) {
                        params = Object.assign(params, {
                            limit: options.limit
                        });
                    }
                }
                return [2, this.client.get('/api/v1/mutes', params).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (a) { return PleromaAPI.Converter.account(a); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getBlocks = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {};
                if (options) {
                    if (options.min_id) {
                        params = Object.assign(params, {
                            min_id: options.min_id
                        });
                    }
                    if (options.max_id) {
                        params = Object.assign(params, {
                            max_id: options.max_id
                        });
                    }
                    if (options.limit) {
                        params = Object.assign(params, {
                            limit: options.limit
                        });
                    }
                }
                return [2, this.client.get('/api/v1/blocks', params).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (a) { return PleromaAPI.Converter.account(a); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getDomainBlocks = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {};
                if (options) {
                    if (options.min_id) {
                        params = Object.assign(params, {
                            min_id: options.min_id
                        });
                    }
                    if (options.max_id) {
                        params = Object.assign(params, {
                            max_id: options.max_id
                        });
                    }
                    if (options.limit) {
                        params = Object.assign(params, {
                            limit: options.limit
                        });
                    }
                }
                return [2, this.client.get('/api/v1/domain_blocks', params)];
            });
        });
    };
    Pleroma.prototype.blockDomain = function (domain) {
        return this.client.post('/api/v1/domain_blocks', {
            domain: domain
        });
    };
    Pleroma.prototype.unblockDomain = function (domain) {
        return this.client.del('/api/v1/domain_blocks', {
            domain: domain
        });
    };
    Pleroma.prototype.getFilters = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.get('/api/v1/filters').then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (f) { return PleromaAPI.Converter.filter(f); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getFilter = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.get("/api/v1/filters/".concat(id)).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.filter(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.createFilter = function (phrase, context, options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {
                    phrase: phrase,
                    context: context
                };
                if (options) {
                    if (options.irreversible !== undefined) {
                        params = Object.assign(params, {
                            irreversible: options.irreversible
                        });
                    }
                    if (options.whole_word !== undefined) {
                        params = Object.assign(params, {
                            whole_word: options.whole_word
                        });
                    }
                    if (options.expires_in) {
                        params = Object.assign(params, {
                            expires_in: options.expires_in
                        });
                    }
                }
                return [2, this.client.post('/api/v1/filters', params).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.filter(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.updateFilter = function (id, phrase, context, options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {
                    phrase: phrase,
                    context: context
                };
                if (options) {
                    if (options.irreversible !== undefined) {
                        params = Object.assign(params, {
                            irreversible: options.irreversible
                        });
                    }
                    if (options.whole_word !== undefined) {
                        params = Object.assign(params, {
                            whole_word: options.whole_word
                        });
                    }
                    if (options.expires_in) {
                        params = Object.assign(params, {
                            expires_in: options.expires_in
                        });
                    }
                }
                return [2, this.client.put("/api/v1/filters/".concat(id), params).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.filter(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.deleteFilter = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.del("/api/v1/filters/".concat(id)).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.filter(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.report = function (account_id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {
                    account_id: account_id
                };
                if (options) {
                    if (options.status_ids) {
                        params = Object.assign(params, {
                            status_ids: options.status_ids
                        });
                    }
                    if (options.comment) {
                        params = Object.assign(params, {
                            comment: options.comment
                        });
                    }
                    if (options.forward !== undefined) {
                        params = Object.assign(params, {
                            forward: options.forward
                        });
                    }
                    if (options.category) {
                        params = Object.assign(params, {
                            category: options.category
                        });
                    }
                    if (options.rule_ids) {
                        params = Object.assign(params, {
                            rule_ids: options.rule_ids
                        });
                    }
                }
                return [2, this.client.post('/api/v1/reports', params).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.report(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getFollowRequests = function (limit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (limit) {
                    return [2, this.client
                            .get('/api/v1/follow_requests', {
                            limit: limit
                        })
                            .then(function (res) {
                            return Object.assign(res, {
                                data: res.data.map(function (a) { return PleromaAPI.Converter.account(a); })
                            });
                        })];
                }
                else {
                    return [2, this.client.get('/api/v1/follow_requests').then(function (res) {
                            return Object.assign(res, {
                                data: res.data.map(function (a) { return PleromaAPI.Converter.account(a); })
                            });
                        })];
                }
                return [2];
            });
        });
    };
    Pleroma.prototype.acceptFollowRequest = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.post("/api/v1/follow_requests/".concat(id, "/authorize")).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.relationship(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.rejectFollowRequest = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.post("/api/v1/follow_requests/".concat(id, "/reject")).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.relationship(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getEndorsements = function (options) {
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
                            max_id: options.max_id
                        });
                    }
                    if (options.since_id) {
                        params = Object.assign(params, {
                            since_id: options.since_id
                        });
                    }
                }
                return [2, this.client.get('/api/v1/endorsements', params).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (a) { return PleromaAPI.Converter.account(a); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getFeaturedTags = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.get('/api/v1/featured_tags').then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (f) { return PleromaAPI.Converter.featured_tag(f); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.createFeaturedTag = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client
                        .post('/api/v1/featured_tags', {
                        name: name
                    })
                        .then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.featured_tag(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.deleteFeaturedTag = function (id) {
        return this.client.del("/api/v1/featured_tags/".concat(id));
    };
    Pleroma.prototype.getSuggestedTags = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.get('/api/v1/featured_tags/suggestions').then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (t) { return PleromaAPI.Converter.tag(t); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getPreferences = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.get('/api/v1/preferences').then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.preferences(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getFollowedTags = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Pleroma does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Pleroma.prototype.getSuggestions = function (limit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (limit) {
                    return [2, this.client
                            .get('/api/v1/suggestions', {
                            limit: limit
                        })
                            .then(function (res) {
                            return Object.assign(res, {
                                data: res.data.map(function (a) { return PleromaAPI.Converter.account(a); })
                            });
                        })];
                }
                else {
                    return [2, this.client.get('/api/v1/suggestions').then(function (res) {
                            return Object.assign(res, {
                                data: res.data.map(function (a) { return PleromaAPI.Converter.account(a); })
                            });
                        })];
                }
                return [2];
            });
        });
    };
    Pleroma.prototype.getTag = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Pleroma does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Pleroma.prototype.followTag = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Pleroma does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Pleroma.prototype.unfollowTag = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Pleroma does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Pleroma.prototype.postStatus = function (status, options) {
        return __awaiter(this, void 0, void 0, function () {
            var params, pollParam;
            return __generator(this, function (_a) {
                params = {
                    status: status
                };
                if (options) {
                    if (options.media_ids) {
                        params = Object.assign(params, {
                            media_ids: options.media_ids
                        });
                    }
                    if (options.poll) {
                        pollParam = {
                            options: options.poll.options,
                            expires_in: options.poll.expires_in
                        };
                        if (options.poll.multiple !== undefined) {
                            pollParam = Object.assign(pollParam, {
                                multiple: options.poll.multiple
                            });
                        }
                        if (options.poll.hide_totals !== undefined) {
                            pollParam = Object.assign(pollParam, {
                                hide_totals: options.poll.hide_totals
                            });
                        }
                        params = Object.assign(params, {
                            poll: pollParam
                        });
                    }
                    if (options.in_reply_to_id) {
                        params = Object.assign(params, {
                            in_reply_to_id: options.in_reply_to_id
                        });
                    }
                    if (options.sensitive !== undefined) {
                        params = Object.assign(params, {
                            sensitive: options.sensitive
                        });
                    }
                    if (options.spoiler_text) {
                        params = Object.assign(params, {
                            spoiler_text: options.spoiler_text
                        });
                    }
                    if (options.visibility) {
                        params = Object.assign(params, {
                            visibility: options.visibility
                        });
                    }
                    if (options.scheduled_at) {
                        params = Object.assign(params, {
                            scheduled_at: options.scheduled_at
                        });
                    }
                    if (options.language) {
                        params = Object.assign(params, {
                            language: options.language
                        });
                    }
                    if (options.quote_id) {
                        params = Object.assign(params, {
                            quote_id: options.quote_id
                        });
                    }
                }
                if (options && options.scheduled_at) {
                    return [2, this.client.post('/api/v1/statuses', params).then(function (res) {
                            return Object.assign(res, {
                                data: PleromaAPI.Converter.scheduled_status(res.data)
                            });
                        })];
                }
                return [2, this.client.post('/api/v1/statuses', params).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.status(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getStatus = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.get("/api/v1/statuses/".concat(id)).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.status(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.editStatus = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var params, pollParam;
            return __generator(this, function (_a) {
                params = {};
                if (options.status) {
                    params = Object.assign(params, {
                        status: options.status
                    });
                }
                if (options.spoiler_text) {
                    params = Object.assign(params, {
                        spoiler_text: options.spoiler_text
                    });
                }
                if (options.sensitive) {
                    params = Object.assign(params, {
                        sensitive: options.sensitive
                    });
                }
                if (options.media_ids) {
                    params = Object.assign(params, {
                        media_ids: options.media_ids
                    });
                }
                if (options.poll) {
                    pollParam = {};
                    if (options.poll.options !== undefined) {
                        pollParam = Object.assign(pollParam, {
                            options: options.poll.options
                        });
                    }
                    if (options.poll.expires_in !== undefined) {
                        pollParam = Object.assign(pollParam, {
                            expires_in: options.poll.expires_in
                        });
                    }
                    if (options.poll.multiple !== undefined) {
                        pollParam = Object.assign(pollParam, {
                            multiple: options.poll.multiple
                        });
                    }
                    if (options.poll.hide_totals !== undefined) {
                        pollParam = Object.assign(pollParam, {
                            hide_totals: options.poll.hide_totals
                        });
                    }
                    params = Object.assign(params, {
                        poll: pollParam
                    });
                }
                return [2, this.client.put("/api/v1/statuses/".concat(id), params).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.status(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.deleteStatus = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.del("/api/v1/statuses/".concat(id)).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.status(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getStatusContext = function (id, options) {
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
                            max_id: options.max_id
                        });
                    }
                    if (options.since_id) {
                        params = Object.assign(params, {
                            since_id: options.since_id
                        });
                    }
                }
                return [2, this.client.get("/api/v1/statuses/".concat(id, "/context"), params).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.context(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getStatusSource = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.get("/api/v1/statuses/".concat(id, "/source")).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.status_source(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getStatusRebloggedBy = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.get("/api/v1/statuses/".concat(id, "/reblogged_by")).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (a) { return PleromaAPI.Converter.account(a); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getStatusFavouritedBy = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.get("/api/v1/statuses/".concat(id, "/favourited_by")).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (a) { return PleromaAPI.Converter.account(a); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.favouriteStatus = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.post("/api/v1/statuses/".concat(id, "/favourite")).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.status(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.unfavouriteStatus = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.post("/api/v1/statuses/".concat(id, "/unfavourite")).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.status(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.reblogStatus = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.post("/api/v1/statuses/".concat(id, "/reblog")).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.status(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.unreblogStatus = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.post("/api/v1/statuses/".concat(id, "/unreblog")).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.status(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.bookmarkStatus = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.post("/api/v1/statuses/".concat(id, "/bookmark")).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.status(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.unbookmarkStatus = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.post("/api/v1/statuses/".concat(id, "/unbookmark")).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.status(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.muteStatus = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.post("/api/v1/statuses/".concat(id, "/mute")).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.status(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.unmuteStatus = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.post("/api/v1/statuses/".concat(id, "/unmute")).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.status(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.pinStatus = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.post("/api/v1/statuses/".concat(id, "/pin")).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.status(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.unpinStatus = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.post("/api/v1/statuses/".concat(id, "/unpin")).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.status(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.uploadMedia = function (file, options) {
        return __awaiter(this, void 0, void 0, function () {
            var formData;
            return __generator(this, function (_a) {
                formData = new FormData();
                formData.append('file', file);
                if (options) {
                    if (options.description) {
                        formData.append('description', options.description);
                    }
                    if (options.focus) {
                        formData.append('focus', options.focus);
                    }
                }
                return [2, this.client.postForm('/api/v2/media', formData).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.async_attachment(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getMedia = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.get("/api/v1/media/".concat(id))];
                    case 1:
                        res = _a.sent();
                        return [2, Object.assign(res, {
                                data: PleromaAPI.Converter.attachment(res.data)
                            })];
                }
            });
        });
    };
    Pleroma.prototype.updateMedia = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var formData;
            return __generator(this, function (_a) {
                formData = new FormData();
                if (options) {
                    if (options.file) {
                        formData.append('file', options.file);
                    }
                    if (options.description) {
                        formData.append('description', options.description);
                    }
                    if (options.focus) {
                        formData.append('focus', options.focus);
                    }
                }
                return [2, this.client.putForm("/api/v1/media/".concat(id), formData).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.attachment(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getPoll = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.get("/api/v1/polls/".concat(id)).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.poll(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.votePoll = function (id, choices) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client
                        .post("/api/v1/polls/".concat(id, "/votes"), {
                        choices: choices
                    })
                        .then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.poll(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getScheduledStatuses = function (options) {
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
                            max_id: options.max_id
                        });
                    }
                    if (options.since_id) {
                        params = Object.assign(params, {
                            since_id: options.since_id
                        });
                    }
                    if (options.min_id) {
                        params = Object.assign(params, {
                            min_id: options.min_id
                        });
                    }
                }
                return [2, this.client.get('/api/v1/scheduled_statuses', params).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (s) { return PleromaAPI.Converter.scheduled_status(s); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getScheduledStatus = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.get("/api/v1/scheduled_statuses/".concat(id)).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.scheduled_status(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.scheduleStatus = function (id, scheduled_at) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {};
                if (scheduled_at) {
                    params = Object.assign(params, {
                        scheduled_at: scheduled_at
                    });
                }
                return [2, this.client.put("/api/v1/scheduled_statuses/".concat(id), params).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.scheduled_status(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.cancelScheduledStatus = function (id) {
        return this.client.del("/api/v1/scheduled_statuses/".concat(id));
    };
    Pleroma.prototype.getPublicTimeline = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {
                    local: false
                };
                if (options) {
                    if (options.only_media !== undefined) {
                        params = Object.assign(params, {
                            only_media: options.only_media
                        });
                    }
                    if (options.max_id) {
                        params = Object.assign(params, {
                            max_id: options.max_id
                        });
                    }
                    if (options.since_id) {
                        params = Object.assign(params, {
                            since_id: options.since_id
                        });
                    }
                    if (options.min_id) {
                        params = Object.assign(params, {
                            min_id: options.min_id
                        });
                    }
                    if (options.limit) {
                        params = Object.assign(params, {
                            limit: options.limit
                        });
                    }
                }
                return [2, this.client.get('/api/v1/timelines/public', params).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (s) { return PleromaAPI.Converter.status(s); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getLocalTimeline = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {
                    local: true
                };
                if (options) {
                    if (options.only_media !== undefined) {
                        params = Object.assign(params, {
                            only_media: options.only_media
                        });
                    }
                    if (options.max_id) {
                        params = Object.assign(params, {
                            max_id: options.max_id
                        });
                    }
                    if (options.since_id) {
                        params = Object.assign(params, {
                            since_id: options.since_id
                        });
                    }
                    if (options.min_id) {
                        params = Object.assign(params, {
                            min_id: options.min_id
                        });
                    }
                    if (options.limit) {
                        params = Object.assign(params, {
                            limit: options.limit
                        });
                    }
                }
                return [2, this.client.get('/api/v1/timelines/public', params).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (s) { return PleromaAPI.Converter.status(s); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getTagTimeline = function (hashtag, options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {};
                if (options) {
                    if (options.local !== undefined) {
                        params = Object.assign(params, {
                            local: options.local
                        });
                    }
                    if (options.only_media !== undefined) {
                        params = Object.assign(params, {
                            only_media: options.only_media
                        });
                    }
                    if (options.max_id) {
                        params = Object.assign(params, {
                            max_id: options.max_id
                        });
                    }
                    if (options.since_id) {
                        params = Object.assign(params, {
                            since_id: options.since_id
                        });
                    }
                    if (options.min_id) {
                        params = Object.assign(params, {
                            min_id: options.min_id
                        });
                    }
                    if (options.limit) {
                        params = Object.assign(params, {
                            limit: options.limit
                        });
                    }
                }
                return [2, this.client.get("/api/v1/timelines/tag/".concat(hashtag), params).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (s) { return PleromaAPI.Converter.status(s); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getHomeTimeline = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {};
                if (options) {
                    if (options.local !== undefined) {
                        params = Object.assign(params, {
                            local: options.local
                        });
                    }
                    if (options.max_id) {
                        params = Object.assign(params, {
                            max_id: options.max_id
                        });
                    }
                    if (options.since_id) {
                        params = Object.assign(params, {
                            since_id: options.since_id
                        });
                    }
                    if (options.min_id) {
                        params = Object.assign(params, {
                            min_id: options.min_id
                        });
                    }
                    if (options.limit) {
                        params = Object.assign(params, {
                            limit: options.limit
                        });
                    }
                }
                return [2, this.client.get('/api/v1/timelines/home', params).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (s) { return PleromaAPI.Converter.status(s); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getListTimeline = function (list_id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {};
                if (options) {
                    if (options.max_id) {
                        params = Object.assign(params, {
                            max_id: options.max_id
                        });
                    }
                    if (options.since_id) {
                        params = Object.assign(params, {
                            since_id: options.since_id
                        });
                    }
                    if (options.min_id) {
                        params = Object.assign(params, {
                            min_id: options.min_id
                        });
                    }
                    if (options.limit) {
                        params = Object.assign(params, {
                            limit: options.limit
                        });
                    }
                }
                return [2, this.client.get("/api/v1/timelines/list/".concat(list_id), params).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (s) { return PleromaAPI.Converter.status(s); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getConversationTimeline = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {};
                if (options) {
                    if (options.max_id) {
                        params = Object.assign(params, {
                            max_id: options.max_id
                        });
                    }
                    if (options.since_id) {
                        params = Object.assign(params, {
                            since_id: options.since_id
                        });
                    }
                    if (options.min_id) {
                        params = Object.assign(params, {
                            min_id: options.min_id
                        });
                    }
                    if (options.limit) {
                        params = Object.assign(params, {
                            limit: options.limit
                        });
                    }
                }
                return [2, this.client.get('/api/v1/conversations', params).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (c) { return PleromaAPI.Converter.conversation(c); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.deleteConversation = function (id) {
        return this.client.del("/api/v1/conversations/".concat(id));
    };
    Pleroma.prototype.readConversation = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.post("/api/v1/conversations/".concat(id, "/read")).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.conversation(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getLists = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.get('/api/v1/lists').then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (l) { return PleromaAPI.Converter.list(l); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getList = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.get("/api/v1/lists/".concat(id)).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.list(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.createList = function (title) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client
                        .post('/api/v1/lists', {
                        title: title
                    })
                        .then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.list(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.updateList = function (id, title) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client
                        .put("/api/v1/lists/".concat(id), {
                        title: title
                    })
                        .then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.list(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.deleteList = function (id) {
        return this.client.del("/api/v1/lists/".concat(id));
    };
    Pleroma.prototype.getAccountsInList = function (id, options) {
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
                            max_id: options.max_id
                        });
                    }
                    if (options.since_id) {
                        params = Object.assign(params, {
                            since_id: options.since_id
                        });
                    }
                }
                return [2, this.client.get("/api/v1/lists/".concat(id, "/accounts"), params).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (a) { return PleromaAPI.Converter.account(a); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.addAccountsToList = function (id, account_ids) {
        return this.client.post("/api/v1/lists/".concat(id, "/accounts"), {
            account_ids: account_ids
        });
    };
    Pleroma.prototype.deleteAccountsFromList = function (id, account_ids) {
        return this.client.del("/api/v1/lists/".concat(id, "/accounts"), {
            account_ids: account_ids
        });
    };
    Pleroma.prototype.getMarkers = function (timeline) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client
                        .get('/api/v1/markers', {
                        timeline: timeline
                    })
                        .then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.marker(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.saveMarkers = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {};
                if (options) {
                    if (options.home) {
                        params = Object.assign(params, {
                            home: options.home
                        });
                    }
                    if (options.notifications) {
                        params = Object.assign(params, {
                            notifications: options.notifications
                        });
                    }
                }
                return [2, this.client.post('/api/v1/markers', params).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.marker(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getNotifications = function (options) {
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
                            max_id: options.max_id
                        });
                    }
                    if (options.since_id) {
                        params = Object.assign(params, {
                            since_id: options.since_id
                        });
                    }
                    if (options.min_id) {
                        params = Object.assign(params, {
                            min_id: options.min_id
                        });
                    }
                    if (options.exclude_types) {
                        params = Object.assign(params, {
                            exclude_types: options.exclude_types.map(function (e) { return PleromaAPI.Converter.encodeNotificationType(e); })
                        });
                    }
                    if (options.account_id) {
                        params = Object.assign(params, {
                            account_id: options.account_id
                        });
                    }
                }
                return [2, this.client.get('/api/v1/notifications', params).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.flatMap(function (n) {
                                var notify = PleromaAPI.Converter.notification(n);
                                if (notify instanceof UnknownNotificationTypeError)
                                    return [];
                                return notify;
                            })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getNotification = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var res, notify;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.get("/api/v1/notifications/".concat(id))];
                    case 1:
                        res = _a.sent();
                        notify = PleromaAPI.Converter.notification(res.data);
                        if (notify instanceof UnknownNotificationTypeError) {
                            throw new UnknownNotificationTypeError();
                        }
                        return [2, __assign(__assign({}, res), { data: notify })];
                }
            });
        });
    };
    Pleroma.prototype.dismissNotifications = function () {
        return this.client.post('/api/v1/notifications/clear');
    };
    Pleroma.prototype.dismissNotification = function (id) {
        return this.client.post("/api/v1/notifications/".concat(id, "/dismiss"));
    };
    Pleroma.prototype.readNotifications = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var res, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!options.id) return [3, 2];
                        return [4, this.client.post('/api/v1/pleroma/notifications/read', {
                                id: options.id
                            })];
                    case 1:
                        res = _a.sent();
                        return [2, res];
                    case 2:
                        if (!options.max_id) return [3, 4];
                        return [4, this.client.post('/api/v1/pleroma/notifications/read', {
                                max_id: options.max_id
                            })];
                    case 3:
                        res = _a.sent();
                        return [2, res];
                    case 4: return [2, new Promise(function (_, reject) {
                            var err = new ArgumentError('id or max_id is required');
                            reject(err);
                        })];
                }
            });
        });
    };
    Pleroma.prototype.subscribePushNotification = function (subscription, data) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {
                    subscription: subscription
                };
                if (data) {
                    params = Object.assign(params, {
                        data: data
                    });
                }
                return [2, this.client.post('/api/v1/push/subscription', params).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.push_subscription(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getPushSubscription = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.get('/api/v1/push/subscription').then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.push_subscription(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.updatePushSubscription = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {};
                if (data) {
                    params = Object.assign(params, {
                        data: data
                    });
                }
                return [2, this.client.put('/api/v1/push/subscription', params).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.push_subscription(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.deletePushSubscription = function () {
        return this.client.del('/api/v1/push/subscription');
    };
    Pleroma.prototype.search = function (q, options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {
                    q: q
                };
                if (options) {
                    if (options.type) {
                        params = Object.assign(params, {
                            type: options.type
                        });
                    }
                    if (options.limit) {
                        params = Object.assign(params, {
                            limit: options.limit
                        });
                    }
                    if (options.max_id) {
                        params = Object.assign(params, {
                            max_id: options.max_id
                        });
                    }
                    if (options.min_id) {
                        params = Object.assign(params, {
                            min_id: options.min_id
                        });
                    }
                    if (options.resolve !== undefined) {
                        params = Object.assign(params, {
                            resolve: options.resolve
                        });
                    }
                    if (options.offset) {
                        params = Object.assign(params, {
                            offset: options.offset
                        });
                    }
                    if (options.following !== undefined) {
                        params = Object.assign(params, {
                            following: options.following
                        });
                    }
                    if (options.account_id) {
                        params = Object.assign(params, {
                            account_id: options.account_id
                        });
                    }
                    if (options.exclude_unreviewed) {
                        params = Object.assign(params, {
                            exclude_unreviewed: options.exclude_unreviewed
                        });
                    }
                }
                return [2, this.client.get('/api/v2/search', params).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.results(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.get('/api/v1/instance').then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.instance(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getInstancePeers = function () {
        return this.client.get('/api/v1/instance/peers');
    };
    Pleroma.prototype.getInstanceActivity = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.get('/api/v1/instance/activity').then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (a) { return PleromaAPI.Converter.activity(a); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getInstanceTrends = function (limit) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {};
                if (limit) {
                    params = Object.assign(params, {
                        limit: limit
                    });
                }
                return [2, this.client.get('/api/v1/trends', params).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (t) { return PleromaAPI.Converter.tag(t); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getInstanceDirectory = function (options) {
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
                    if (options.offset) {
                        params = Object.assign(params, {
                            offset: options.offset
                        });
                    }
                    if (options.order) {
                        params = Object.assign(params, {
                            order: options.order
                        });
                    }
                    if (options.local !== undefined) {
                        params = Object.assign(params, {
                            local: options.local
                        });
                    }
                }
                return [2, this.client.get('/api/v1/directory', params).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (a) { return PleromaAPI.Converter.account(a); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getInstanceCustomEmojis = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.get('/api/v1/custom_emojis').then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (e) { return PleromaAPI.Converter.emoji(e); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getInstanceAnnouncements = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.get('/api/v1/announcements').then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (a) { return PleromaAPI.Converter.announcement(a); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.dismissInstanceAnnouncement = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.post("/api/v1/announcements/".concat(id, "/dismiss"))];
            });
        });
    };
    Pleroma.prototype.addReactionToAnnouncement = function (_id, _name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Pleroma does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Pleroma.prototype.removeReactionFromAnnouncement = function (_id, _name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (_, reject) {
                        var err = new NotImplementedError('Pleroma does not support this method');
                        reject(err);
                    })];
            });
        });
    };
    Pleroma.prototype.createEmojiReaction = function (id, emoji) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.put("/api/v1/pleroma/statuses/".concat(id, "/reactions/").concat(encodeURI(emoji))).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.status(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.deleteEmojiReaction = function (id, emoji) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.del("/api/v1/pleroma/statuses/".concat(id, "/reactions/").concat(encodeURI(emoji))).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.status(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getEmojiReactions = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.get("/api/v1/pleroma/statuses/".concat(id, "/reactions")).then(function (res) {
                        return Object.assign(res, {
                            data: res.data.map(function (r) { return PleromaAPI.Converter.reaction(r); })
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.getEmojiReaction = function (id, emoji) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.get("/api/v1/pleroma/statuses/".concat(id, "/reactions/").concat(encodeURI(emoji))).then(function (res) {
                        return Object.assign(res, {
                            data: PleromaAPI.Converter.reaction(res.data)
                        });
                    })];
            });
        });
    };
    Pleroma.prototype.streamingURL = function () {
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
    Pleroma.prototype.userStreaming = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.streamingURL()];
                    case 1:
                        url = _a.sent();
                        return [2, this.client.socket("".concat(url, "/api/v1/streaming"), 'user')];
                }
            });
        });
    };
    Pleroma.prototype.publicStreaming = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.streamingURL()];
                    case 1:
                        url = _a.sent();
                        return [2, this.client.socket("".concat(url, "/api/v1/streaming"), 'public')];
                }
            });
        });
    };
    Pleroma.prototype.localStreaming = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.streamingURL()];
                    case 1:
                        url = _a.sent();
                        return [2, this.client.socket("".concat(url, "/api/v1/streaming"), 'public:local')];
                }
            });
        });
    };
    Pleroma.prototype.tagStreaming = function (tag) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.streamingURL()];
                    case 1:
                        url = _a.sent();
                        return [2, this.client.socket("".concat(url, "/api/v1/streaming"), 'hashtag', "tag=".concat(tag))];
                }
            });
        });
    };
    Pleroma.prototype.listStreaming = function (list_id) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.streamingURL()];
                    case 1:
                        url = _a.sent();
                        return [2, this.client.socket("".concat(url, "/api/v1/streaming"), 'list', "list=".concat(list_id))];
                }
            });
        });
    };
    Pleroma.prototype.directStreaming = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.streamingURL()];
                    case 1:
                        url = _a.sent();
                        return [2, this.client.socket("".concat(url, "/api/v1/streaming"), 'direct')];
                }
            });
        });
    };
    return Pleroma;
}());
export default Pleroma;