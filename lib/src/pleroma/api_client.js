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
var axios_1 = __importDefault(require("axios"));
var object_assign_deep_1 = __importDefault(require("object-assign-deep"));
var cancel_1 = require("../cancel");
var default_1 = require("../default");
var web_socket_1 = __importDefault(require("./web_socket"));
var notification_1 = __importStar(require("../notification"));
var notification_2 = __importDefault(require("./notification"));
var PleromaAPI;
(function (PleromaAPI) {
    var Converter;
    (function (Converter) {
        Converter.decodeNotificationType = function (t) {
            switch (t) {
                case notification_2.default.Mention:
                    return notification_1.default.Mention;
                case notification_2.default.Reblog:
                    return notification_1.default.Reblog;
                case notification_2.default.Favourite:
                    return notification_1.default.Favourite;
                case notification_2.default.Follow:
                    return notification_1.default.Follow;
                case notification_2.default.Poll:
                    return notification_1.default.PollExpired;
                case notification_2.default.PleromaEmojiReaction:
                    return notification_1.default.Reaction;
                case notification_2.default.FollowRequest:
                    return notification_1.default.FollowRequest;
                case notification_2.default.Update:
                    return notification_1.default.Update;
                case notification_2.default.Move:
                    return notification_1.default.Move;
                case notification_2.default.Status:
                    return notification_1.default.Status;
                default:
                    return new notification_1.UnknownNotificationTypeError();
            }
        };
        Converter.encodeNotificationType = function (t) {
            switch (t) {
                case notification_1.default.Follow:
                    return notification_2.default.Follow;
                case notification_1.default.Favourite:
                    return notification_2.default.Favourite;
                case notification_1.default.Reblog:
                    return notification_2.default.Reblog;
                case notification_1.default.Mention:
                    return notification_2.default.Mention;
                case notification_1.default.PollExpired:
                    return notification_2.default.Poll;
                case notification_1.default.Reaction:
                    return notification_2.default.PleromaEmojiReaction;
                case notification_1.default.FollowRequest:
                    return notification_2.default.FollowRequest;
                case notification_1.default.Update:
                    return notification_2.default.Update;
                case notification_1.default.Move:
                    return notification_2.default.Move;
                case notification_1.default.Status:
                    return notification_2.default.Status;
                default:
                    return new notification_1.UnknownNotificationTypeError();
            }
        };
        Converter.account = function (a) {
            return {
                id: a.id,
                username: a.username,
                acct: a.acct,
                display_name: a.display_name,
                locked: a.locked,
                discoverable: a.discoverable,
                group: null,
                noindex: a.noindex,
                suspended: a.suspended,
                limited: a.limited,
                created_at: a.created_at,
                followers_count: a.followers_count,
                following_count: a.following_count,
                statuses_count: a.statuses_count,
                note: a.note,
                url: a.url,
                avatar: a.avatar,
                avatar_static: a.avatar_static,
                header: a.header,
                header_static: a.header_static,
                emojis: a.emojis.map(function (e) { return Converter.emoji(e); }),
                moved: a.moved ? Converter.account(a.moved) : null,
                fields: a.fields,
                bot: a.bot,
                source: a.source
            };
        };
        Converter.activity = function (a) { return a; };
        Converter.announcement = function (a) { return ({
            id: a.id,
            content: a.content,
            starts_at: a.starts_at,
            ends_at: a.ends_at,
            published: a.published,
            all_day: a.all_day,
            published_at: a.published_at,
            updated_at: a.updated_at,
            read: null,
            mentions: a.mentions,
            statuses: a.statuses,
            tags: a.tags,
            emojis: a.emojis,
            reactions: a.reactions
        }); };
        Converter.application = function (a) { return a; };
        Converter.attachment = function (a) { return a; };
        Converter.async_attachment = function (a) {
            if (a.url) {
                return {
                    id: a.id,
                    type: a.type,
                    url: a.url,
                    remote_url: a.remote_url,
                    preview_url: a.preview_url,
                    text_url: a.text_url,
                    meta: a.meta,
                    description: a.description,
                    blurhash: a.blurhash
                };
            }
            else {
                return a;
            }
        };
        Converter.card = function (c) { return ({
            url: c.url,
            title: c.title,
            description: c.description,
            type: c.type,
            image: c.image,
            author_name: null,
            author_url: null,
            provider_name: c.provider_name,
            provider_url: c.provider_url,
            html: null,
            width: null,
            height: null,
            embed_url: null,
            blurhash: null
        }); };
        Converter.context = function (c) { return ({
            ancestors: Array.isArray(c.ancestors) ? c.ancestors.map(function (a) { return Converter.status(a); }) : [],
            descendants: Array.isArray(c.descendants) ? c.descendants.map(function (d) { return Converter.status(d); }) : []
        }); };
        Converter.conversation = function (c) { return ({
            id: c.id,
            accounts: Array.isArray(c.accounts) ? c.accounts.map(function (a) { return Converter.account(a); }) : [],
            last_status: c.last_status ? Converter.status(c.last_status) : null,
            unread: c.unread
        }); };
        Converter.emoji = function (e) { return ({
            shortcode: e.shortcode,
            static_url: e.static_url,
            url: e.url,
            visible_in_picker: e.visible_in_picker
        }); };
        Converter.featured_tag = function (f) { return f; };
        Converter.field = function (f) { return f; };
        Converter.filter = function (f) { return f; };
        Converter.history = function (h) { return h; };
        Converter.identity_proof = function (i) { return i; };
        Converter.instance = function (i) { return ({
            uri: i.uri,
            title: i.title,
            description: i.description,
            email: i.email,
            version: i.version,
            thumbnail: i.thumbnail,
            urls: Converter.urls(i.urls),
            stats: Converter.stats(i.stats),
            languages: i.languages,
            registrations: i.registrations,
            approval_required: i.approval_required,
            configuration: {
                statuses: {
                    max_characters: i.max_toot_chars,
                    max_media_attachments: i.max_media_attachments
                },
                polls: {
                    max_options: i.poll_limits.max_options,
                    max_characters_per_option: i.poll_limits.max_option_chars,
                    min_expiration: i.poll_limits.min_expiration,
                    max_expiration: i.poll_limits.max_expiration
                }
            }
        }); };
        Converter.list = function (l) { return ({
            id: l.id,
            title: l.title,
            replies_policy: null
        }); };
        Converter.marker = function (m) {
            if (m.notifications) {
                var mm = m;
                return {
                    notifications: {
                        last_read_id: mm.notifications.last_read_id,
                        version: mm.notifications.version,
                        updated_at: mm.notifications.updated_at,
                        unread_count: mm.notifications.pleroma.unread_count
                    }
                };
            }
            else {
                return {};
            }
        };
        Converter.mention = function (m) { return m; };
        Converter.notification = function (n) {
            var notificationType = Converter.decodeNotificationType(n.type);
            if (notificationType instanceof notification_1.UnknownNotificationTypeError)
                return notificationType;
            if (n.status && n.emoji) {
                var r = Converter.mapReaction(n);
                return {
                    id: n.id,
                    account: Converter.account(n.account),
                    created_at: n.created_at,
                    status: Converter.status(n.status),
                    reaction: r ? Converter.reaction(r) : undefined,
                    type: notificationType
                };
            }
            else if (n.status) {
                return {
                    id: n.id,
                    account: Converter.account(n.account),
                    created_at: n.created_at,
                    status: Converter.status(n.status),
                    type: notificationType
                };
            }
            else if (n.target) {
                return {
                    id: n.id,
                    account: Converter.account(n.account),
                    created_at: n.created_at,
                    target: Converter.account(n.target),
                    type: notificationType
                };
            }
            else {
                return {
                    id: n.id,
                    account: Converter.account(n.account),
                    created_at: n.created_at,
                    type: notificationType
                };
            }
        };
        Converter.mapReaction = function (n) {
            if (!n.emoji)
                return undefined;
            var name = n.emoji.replace(/:/g, '');
            var r = {
                count: 1,
                me: false,
                name: name
            };
            if (n.emoji_url) {
                r = Object.assign({}, r, {
                    url: n.emoji_url
                });
            }
            return r;
        };
        Converter.poll = function (p) { return p; };
        Converter.pollOption = function (p) { return p; };
        Converter.preferences = function (p) { return p; };
        Converter.push_subscription = function (p) { return p; };
        Converter.reaction = function (r) {
            var p = {
                count: r.count,
                me: r.me,
                name: r.name
            };
            if (r.url) {
                p = Object.assign({}, p, {
                    url: r.url,
                    static_url: r.url
                });
            }
            if (r.accounts) {
                p = Object.assign({}, p, {
                    accounts: r.accounts.map(function (a) { return Converter.account(a); })
                });
            }
            if (r.account_ids) {
                p = Object.assign({}, p, {
                    accounts: r.account_ids
                });
            }
            return p;
        };
        Converter.relationship = function (r) { return ({
            id: r.id,
            following: r.following,
            followed_by: r.followed_by,
            blocking: r.blocking,
            blocked_by: r.blocked_by,
            muting: r.muting,
            muting_notifications: r.muting_notifications,
            requested: r.requested,
            domain_blocking: r.domain_blocking,
            showing_reblogs: r.showing_reblogs,
            endorsed: r.endorsed,
            notifying: r.notifying,
            note: r.note
        }); };
        Converter.report = function (r) { return ({
            id: r.id,
            action_taken: r.action_taken,
            action_taken_at: null,
            category: null,
            comment: null,
            forwarded: null,
            status_ids: null,
            rule_ids: null
        }); };
        Converter.results = function (r) { return ({
            accounts: Array.isArray(r.accounts) ? r.accounts.map(function (a) { return Converter.account(a); }) : [],
            statuses: Array.isArray(r.statuses) ? r.statuses.map(function (s) { return Converter.status(s); }) : [],
            hashtags: Array.isArray(r.hashtags) ? r.hashtags.map(function (h) { return Converter.tag(h); }) : []
        }); };
        Converter.scheduled_status = function (s) { return ({
            id: s.id,
            scheduled_at: s.scheduled_at,
            params: Converter.status_params(s.params),
            media_attachments: Array.isArray(s.media_attachments) ? s.media_attachments.map(function (m) { return Converter.attachment(m); }) : null
        }); };
        Converter.source = function (s) { return s; };
        Converter.stats = function (s) { return s; };
        Converter.status = function (s) {
            var _a;
            return ({
                id: s.id,
                uri: s.uri,
                url: s.url,
                account: Converter.account(s.account),
                in_reply_to_id: s.in_reply_to_id,
                in_reply_to_account_id: s.in_reply_to_account_id,
                reblog: s.reblog ? Converter.status(s.reblog) : null,
                content: s.content,
                plain_content: ((_a = s.pleroma.content) === null || _a === void 0 ? void 0 : _a['text/plain']) ? s.pleroma.content['text/plain'] : null,
                created_at: s.created_at,
                edited_at: s.edited_at,
                emojis: Array.isArray(s.emojis) ? s.emojis.map(function (e) { return Converter.emoji(e); }) : [],
                replies_count: s.replies_count,
                reblogs_count: s.reblogs_count,
                favourites_count: s.favourites_count,
                reblogged: s.reblogged,
                favourited: s.favourited,
                muted: s.muted,
                sensitive: s.sensitive,
                spoiler_text: s.spoiler_text,
                visibility: s.visibility,
                media_attachments: Array.isArray(s.media_attachments) ? s.media_attachments.map(function (m) { return Converter.attachment(m); }) : [],
                mentions: Array.isArray(s.mentions) ? s.mentions.map(function (m) { return Converter.mention(m); }) : [],
                tags: s.tags,
                card: s.card ? Converter.card(s.card) : null,
                poll: s.poll ? Converter.poll(s.poll) : null,
                application: s.application ? Converter.application(s.application) : null,
                language: s.language,
                pinned: s.pinned,
                emoji_reactions: Array.isArray(s.pleroma.emoji_reactions) ? s.pleroma.emoji_reactions.map(function (r) { return Converter.reaction(r); }) : [],
                bookmarked: s.bookmarked ? s.bookmarked : false,
                quote: s.reblog !== null && s.reblog.content !== s.content
            });
        };
        Converter.status_params = function (s) {
            return {
                text: s.text,
                in_reply_to_id: s.in_reply_to_id,
                media_ids: Array.isArray(s.media_ids) ? s.media_ids : null,
                sensitive: s.sensitive,
                spoiler_text: s.spoiler_text,
                visibility: s.visibility,
                scheduled_at: s.scheduled_at,
                application_id: null
            };
        };
        Converter.status_source = function (s) { return s; };
        Converter.tag = function (t) { return t; };
        Converter.token = function (t) { return t; };
        Converter.urls = function (u) { return u; };
    })(Converter = PleromaAPI.Converter || (PleromaAPI.Converter = {}));
    var Client = (function () {
        function Client(baseUrl, accessToken, userAgent) {
            if (accessToken === void 0) { accessToken = null; }
            if (userAgent === void 0) { userAgent = default_1.DEFAULT_UA; }
            this.accessToken = accessToken;
            this.baseUrl = baseUrl;
            this.userAgent = userAgent;
            this.abortController = new AbortController();
            axios_1.default.defaults.signal = this.abortController.signal;
        }
        Client.prototype.get = function (path_1) {
            return __awaiter(this, arguments, void 0, function (path, params, headers) {
                var options;
                if (params === void 0) { params = {}; }
                if (headers === void 0) { headers = {}; }
                return __generator(this, function (_a) {
                    options = {
                        params: params,
                        headers: headers
                    };
                    if (this.accessToken) {
                        options = (0, object_assign_deep_1.default)({}, options, {
                            headers: {
                                Authorization: "Bearer ".concat(this.accessToken)
                            }
                        });
                    }
                    return [2, axios_1.default
                            .get(this.baseUrl + path, options)
                            .catch(function (err) {
                            if (axios_1.default.isCancel(err)) {
                                throw new cancel_1.RequestCanceledError(err.message);
                            }
                            else {
                                throw err;
                            }
                        })
                            .then(function (resp) {
                            var res = {
                                data: resp.data,
                                status: resp.status,
                                statusText: resp.statusText,
                                headers: resp.headers
                            };
                            return res;
                        })];
                });
            });
        };
        Client.prototype.put = function (path_1) {
            return __awaiter(this, arguments, void 0, function (path, params, headers) {
                var options;
                if (params === void 0) { params = {}; }
                if (headers === void 0) { headers = {}; }
                return __generator(this, function (_a) {
                    options = {
                        headers: headers,
                        maxContentLength: Infinity,
                        maxBodyLength: Infinity
                    };
                    if (this.accessToken) {
                        options = (0, object_assign_deep_1.default)({}, options, {
                            headers: {
                                Authorization: "Bearer ".concat(this.accessToken)
                            }
                        });
                    }
                    return [2, axios_1.default
                            .put(this.baseUrl + path, params, options)
                            .catch(function (err) {
                            if (axios_1.default.isCancel(err)) {
                                throw new cancel_1.RequestCanceledError(err.message);
                            }
                            else {
                                throw err;
                            }
                        })
                            .then(function (resp) {
                            var res = {
                                data: resp.data,
                                status: resp.status,
                                statusText: resp.statusText,
                                headers: resp.headers
                            };
                            return res;
                        })];
                });
            });
        };
        Client.prototype.putForm = function (path_1) {
            return __awaiter(this, arguments, void 0, function (path, params, headers) {
                var options;
                if (params === void 0) { params = {}; }
                if (headers === void 0) { headers = {}; }
                return __generator(this, function (_a) {
                    options = {
                        headers: headers,
                        maxContentLength: Infinity,
                        maxBodyLength: Infinity
                    };
                    if (this.accessToken) {
                        options = (0, object_assign_deep_1.default)({}, options, {
                            headers: {
                                Authorization: "Bearer ".concat(this.accessToken)
                            }
                        });
                    }
                    return [2, axios_1.default
                            .putForm(this.baseUrl + path, params, options)
                            .catch(function (err) {
                            if (axios_1.default.isCancel(err)) {
                                throw new cancel_1.RequestCanceledError(err.message);
                            }
                            else {
                                throw err;
                            }
                        })
                            .then(function (resp) {
                            var res = {
                                data: resp.data,
                                status: resp.status,
                                statusText: resp.statusText,
                                headers: resp.headers
                            };
                            return res;
                        })];
                });
            });
        };
        Client.prototype.patch = function (path_1) {
            return __awaiter(this, arguments, void 0, function (path, params, headers) {
                var options;
                if (params === void 0) { params = {}; }
                if (headers === void 0) { headers = {}; }
                return __generator(this, function (_a) {
                    options = {
                        headers: headers,
                        maxContentLength: Infinity,
                        maxBodyLength: Infinity
                    };
                    if (this.accessToken) {
                        options = (0, object_assign_deep_1.default)({}, options, {
                            headers: {
                                Authorization: "Bearer ".concat(this.accessToken)
                            }
                        });
                    }
                    return [2, axios_1.default
                            .patch(this.baseUrl + path, params, options)
                            .catch(function (err) {
                            if (axios_1.default.isCancel(err)) {
                                throw new cancel_1.RequestCanceledError(err.message);
                            }
                            else {
                                throw err;
                            }
                        })
                            .then(function (resp) {
                            var res = {
                                data: resp.data,
                                status: resp.status,
                                statusText: resp.statusText,
                                headers: resp.headers
                            };
                            return res;
                        })];
                });
            });
        };
        Client.prototype.patchForm = function (path_1) {
            return __awaiter(this, arguments, void 0, function (path, params, headers) {
                var options;
                if (params === void 0) { params = {}; }
                if (headers === void 0) { headers = {}; }
                return __generator(this, function (_a) {
                    options = {
                        headers: headers,
                        maxContentLength: Infinity,
                        maxBodyLength: Infinity
                    };
                    if (this.accessToken) {
                        options = (0, object_assign_deep_1.default)({}, options, {
                            headers: {
                                Authorization: "Bearer ".concat(this.accessToken)
                            }
                        });
                    }
                    return [2, axios_1.default
                            .patchForm(this.baseUrl + path, params, options)
                            .catch(function (err) {
                            if (axios_1.default.isCancel(err)) {
                                throw new cancel_1.RequestCanceledError(err.message);
                            }
                            else {
                                throw err;
                            }
                        })
                            .then(function (resp) {
                            var res = {
                                data: resp.data,
                                status: resp.status,
                                statusText: resp.statusText,
                                headers: resp.headers
                            };
                            return res;
                        })];
                });
            });
        };
        Client.prototype.post = function (path_1) {
            return __awaiter(this, arguments, void 0, function (path, params, headers) {
                var options;
                if (params === void 0) { params = {}; }
                if (headers === void 0) { headers = {}; }
                return __generator(this, function (_a) {
                    options = {
                        headers: headers,
                        maxContentLength: Infinity,
                        maxBodyLength: Infinity
                    };
                    if (this.accessToken) {
                        options = (0, object_assign_deep_1.default)({}, options, {
                            headers: {
                                Authorization: "Bearer ".concat(this.accessToken)
                            }
                        });
                    }
                    return [2, axios_1.default.post(this.baseUrl + path, params, options).then(function (resp) {
                            var res = {
                                data: resp.data,
                                status: resp.status,
                                statusText: resp.statusText,
                                headers: resp.headers
                            };
                            return res;
                        })];
                });
            });
        };
        Client.prototype.postForm = function (path_1) {
            return __awaiter(this, arguments, void 0, function (path, params, headers) {
                var options;
                if (params === void 0) { params = {}; }
                if (headers === void 0) { headers = {}; }
                return __generator(this, function (_a) {
                    options = {
                        headers: headers,
                        maxContentLength: Infinity,
                        maxBodyLength: Infinity
                    };
                    if (this.accessToken) {
                        options = (0, object_assign_deep_1.default)({}, options, {
                            headers: {
                                Authorization: "Bearer ".concat(this.accessToken)
                            }
                        });
                    }
                    return [2, axios_1.default.postForm(this.baseUrl + path, params, options).then(function (resp) {
                            var res = {
                                data: resp.data,
                                status: resp.status,
                                statusText: resp.statusText,
                                headers: resp.headers
                            };
                            return res;
                        })];
                });
            });
        };
        Client.prototype.del = function (path_1) {
            return __awaiter(this, arguments, void 0, function (path, params, headers) {
                var options;
                if (params === void 0) { params = {}; }
                if (headers === void 0) { headers = {}; }
                return __generator(this, function (_a) {
                    options = {
                        data: params,
                        headers: headers,
                        maxContentLength: Infinity,
                        maxBodyLength: Infinity
                    };
                    if (this.accessToken) {
                        options = (0, object_assign_deep_1.default)({}, options, {
                            headers: {
                                Authorization: "Bearer ".concat(this.accessToken)
                            }
                        });
                    }
                    return [2, axios_1.default
                            .delete(this.baseUrl + path, options)
                            .catch(function (err) {
                            if (axios_1.default.isCancel(err)) {
                                throw new cancel_1.RequestCanceledError(err.message);
                            }
                            else {
                                throw err;
                            }
                        })
                            .then(function (resp) {
                            var res = {
                                data: resp.data,
                                status: resp.status,
                                statusText: resp.statusText,
                                headers: resp.headers
                            };
                            return res;
                        })];
                });
            });
        };
        Client.prototype.cancel = function () {
            return this.abortController.abort();
        };
        Client.prototype.socket = function (url, stream, params) {
            if (!this.accessToken) {
                throw new Error('accessToken is required');
            }
            var streaming = new web_socket_1.default(url, stream, params, this.accessToken, this.userAgent);
            streaming.start();
            return streaming;
        };
        Client.DEFAULT_SCOPE = default_1.DEFAULT_SCOPE;
        Client.DEFAULT_URL = 'https://pleroma.io';
        Client.NO_REDIRECT = default_1.NO_REDIRECT;
        return Client;
    }());
    PleromaAPI.Client = Client;
})(PleromaAPI || (PleromaAPI = {}));
exports.default = PleromaAPI;