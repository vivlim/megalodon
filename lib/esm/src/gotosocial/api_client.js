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
import axios from 'axios';
import objectAssignDeep from 'object-assign-deep';
import Streaming from './web_socket';
import { RequestCanceledError } from '../cancel';
import { NO_REDIRECT, DEFAULT_SCOPE, DEFAULT_UA } from '../default';
import NotificationType, { UnknownNotificationTypeError } from '../notification';
import GotosocialNotificationType from './notification';
var GotosocialAPI;
(function (GotosocialAPI) {
    var Client = (function () {
        function Client(baseUrl, accessToken, userAgent) {
            if (accessToken === void 0) { accessToken = null; }
            if (userAgent === void 0) { userAgent = DEFAULT_UA; }
            this.accessToken = accessToken;
            this.baseUrl = baseUrl;
            this.userAgent = userAgent;
            this.abortController = new AbortController();
            axios.defaults.signal = this.abortController.signal;
        }
        Client.prototype.get = function (path_1) {
            return __awaiter(this, arguments, void 0, function (path, params, headers, pathIsFullyQualified) {
                var options;
                if (params === void 0) { params = {}; }
                if (headers === void 0) { headers = {}; }
                if (pathIsFullyQualified === void 0) { pathIsFullyQualified = false; }
                return __generator(this, function (_a) {
                    options = {
                        params: params,
                        headers: headers,
                        maxContentLength: Infinity,
                        maxBodyLength: Infinity
                    };
                    if (this.accessToken) {
                        options = objectAssignDeep({}, options, {
                            headers: {
                                Authorization: "Bearer ".concat(this.accessToken)
                            }
                        });
                    }
                    return [2, axios
                            .get((pathIsFullyQualified ? '' : this.baseUrl) + path, options)
                            .catch(function (err) {
                            if (axios.isCancel(err)) {
                                throw new RequestCanceledError(err.message);
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
                        options = objectAssignDeep({}, options, {
                            headers: {
                                Authorization: "Bearer ".concat(this.accessToken)
                            }
                        });
                    }
                    return [2, axios
                            .put(this.baseUrl + path, params, options)
                            .catch(function (err) {
                            if (axios.isCancel(err)) {
                                throw new RequestCanceledError(err.message);
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
                        options = objectAssignDeep({}, options, {
                            headers: {
                                Authorization: "Bearer ".concat(this.accessToken)
                            }
                        });
                    }
                    return [2, axios
                            .putForm(this.baseUrl + path, params, options)
                            .catch(function (err) {
                            if (axios.isCancel(err)) {
                                throw new RequestCanceledError(err.message);
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
                        options = objectAssignDeep({}, options, {
                            headers: {
                                Authorization: "Bearer ".concat(this.accessToken)
                            }
                        });
                    }
                    return [2, axios
                            .patch(this.baseUrl + path, params, options)
                            .catch(function (err) {
                            if (axios.isCancel(err)) {
                                throw new RequestCanceledError(err.message);
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
                        options = objectAssignDeep({}, options, {
                            headers: {
                                Authorization: "Bearer ".concat(this.accessToken)
                            }
                        });
                    }
                    return [2, axios
                            .patchForm(this.baseUrl + path, params, options)
                            .catch(function (err) {
                            if (axios.isCancel(err)) {
                                throw new RequestCanceledError(err.message);
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
                        options = objectAssignDeep({}, options, {
                            headers: {
                                Authorization: "Bearer ".concat(this.accessToken)
                            }
                        });
                    }
                    return [2, axios.post(this.baseUrl + path, params, options).then(function (resp) {
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
                        options = objectAssignDeep({}, options, {
                            headers: {
                                Authorization: "Bearer ".concat(this.accessToken)
                            }
                        });
                    }
                    return [2, axios.postForm(this.baseUrl + path, params, options).then(function (resp) {
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
                        options = objectAssignDeep({}, options, {
                            headers: {
                                Authorization: "Bearer ".concat(this.accessToken)
                            }
                        });
                    }
                    return [2, axios
                            .delete(this.baseUrl + path, options)
                            .catch(function (err) {
                            if (axios.isCancel(err)) {
                                throw new RequestCanceledError(err.message);
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
            var streaming = new Streaming(url, stream, params, this.accessToken, this.userAgent);
            streaming.start();
            return streaming;
        };
        Client.DEFAULT_SCOPE = DEFAULT_SCOPE;
        Client.DEFAULT_URL = 'https://mastodon.social';
        Client.NO_REDIRECT = NO_REDIRECT;
        return Client;
    }());
    GotosocialAPI.Client = Client;
    var Converter;
    (function (Converter) {
        Converter.encodeNotificationType = function (t) {
            switch (t) {
                case NotificationType.Follow:
                    return GotosocialNotificationType.Follow;
                case NotificationType.Favourite:
                    return GotosocialNotificationType.Favourite;
                case NotificationType.Reblog:
                    return GotosocialNotificationType.Reblog;
                case NotificationType.Mention:
                    return GotosocialNotificationType.Mention;
                case NotificationType.FollowRequest:
                    return GotosocialNotificationType.FollowRequest;
                case NotificationType.Status:
                    return GotosocialNotificationType.Status;
                case NotificationType.PollExpired:
                    return GotosocialNotificationType.Poll;
                default:
                    return new UnknownNotificationTypeError();
            }
        };
        Converter.decodeNotificationType = function (t) {
            switch (t) {
                case GotosocialNotificationType.Follow:
                    return NotificationType.Follow;
                case GotosocialNotificationType.Favourite:
                    return NotificationType.Favourite;
                case GotosocialNotificationType.Mention:
                    return NotificationType.Mention;
                case GotosocialNotificationType.Reblog:
                    return NotificationType.Reblog;
                case GotosocialNotificationType.FollowRequest:
                    return NotificationType.FollowRequest;
                case GotosocialNotificationType.Status:
                    return NotificationType.Status;
                case GotosocialNotificationType.Poll:
                    return NotificationType.PollExpired;
                default:
                    return new UnknownNotificationTypeError();
            }
        };
        Converter.account = function (a) { return ({
            id: a.id,
            username: a.username,
            acct: a.acct,
            display_name: a.display_name,
            locked: a.locked,
            discoverable: a.discoverable,
            group: null,
            noindex: null,
            suspended: a.suspended,
            limited: null,
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
            emojis: Array.isArray(a.emojis) ? a.emojis.map(function (e) { return Converter.emoji(e); }) : [],
            moved: null,
            fields: Array.isArray(a.fields) ? a.fields.map(function (f) { return Converter.field(f); }) : [],
            bot: a.bot,
            source: a.source ? Converter.source(a.source) : undefined,
            mute_expires_at: a.mute_expires_at,
            role: a.role ? a.role : undefined
        }); };
        Converter.application = function (a) { return a; };
        Converter.attachment = function (a) { return ({
            id: a.id,
            type: a.type,
            url: a.url ? a.url : '',
            remote_url: a.remote_url,
            preview_url: a.preview_url,
            text_url: a.text_url,
            meta: a.meta,
            description: a.description,
            blurhash: a.blurhash
        }); };
        Converter.async_attachment = function (a) {
            if (a.url) {
                return {
                    id: a.id,
                    type: a.type,
                    url: a.url ? a.url : '',
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
            image: c.image,
            type: c.type,
            author_name: c.author_name,
            author_url: c.author_url,
            provider_name: c.provider_name,
            provider_url: c.provider_url,
            html: c.html,
            width: c.width,
            height: c.height,
            embed_url: null,
            blurhash: null
        }); };
        Converter.context = function (c) { return ({
            ancestors: Array.isArray(c.ancestors) ? c.ancestors.map(function (a) { return Converter.status(a); }) : [],
            descendants: Array.isArray(c.descendants) ? c.descendants.map(function (d) { return Converter.status(d); }) : []
        }); };
        Converter.emoji = function (e) { return e; };
        Converter.field = function (f) { return f; };
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
            invites_enabled: i.invites_enabled,
            contact_account: i.contact_account ? Converter.account(i.contact_account) : undefined,
            configuration: i.configuration,
            rules: []
        }); };
        Converter.list = function (l) { return ({
            id: l.id,
            title: l.title,
            replies_policy: l.replies_policy ? l.replies_policy : null
        }); };
        Converter.marker = function (m) { return m; };
        Converter.mention = function (m) { return m; };
        Converter.notification = function (n) {
            var notificationType = Converter.decodeNotificationType(n.type);
            if (notificationType instanceof UnknownNotificationTypeError)
                return notificationType;
            if (n.status) {
                return {
                    account: Converter.account(n.account),
                    created_at: n.created_at,
                    id: n.id,
                    status: Converter.status(n.status),
                    type: notificationType
                };
            }
            else {
                return {
                    account: Converter.account(n.account),
                    created_at: n.created_at,
                    id: n.id,
                    type: notificationType
                };
            }
        };
        Converter.poll = function (p) { return p; };
        Converter.poll_option = function (p) { return p; };
        Converter.preferences = function (p) { return p; };
        Converter.relationship = function (r) { return r; };
        Converter.report = function (r) { return ({
            id: r.id,
            action_taken: r.action_taken,
            action_taken_at: r.action_taken_at,
            status_ids: r.status_ids,
            category: r.category,
            comment: r.comment,
            forwarded: r.forwarded,
            rule_ids: r.rule_ids,
            target_account: Converter.account(r.target_account)
        }); };
        Converter.results = function (r) { return ({
            accounts: Array.isArray(r.accounts) ? r.accounts.map(function (a) { return Converter.account(a); }) : [],
            statuses: Array.isArray(r.statuses) ? r.statuses.map(function (s) { return Converter.status(s); }) : [],
            hashtags: Array.isArray(r.hashtags) ? r.hashtags.map(function (h) { return Converter.tag(h); }) : []
        }); };
        Converter.scheduled_status = function (s) { return ({
            id: s.id,
            media_attachments: Array.isArray(s.media_attachments) ? s.media_attachments.map(function (m) { return Converter.attachment(m); }) : [],
            params: Converter.status_params(s.params),
            scheduled_at: s.scheduled_at
        }); };
        Converter.source = function (s) { return ({
            privacy: s.privacy,
            sensitive: s.sensitive,
            language: s.language,
            note: s.note,
            fields: Array.isArray(s.fields) ? s.fields.map(function (f) { return Converter.field(f); }) : []
        }); };
        Converter.stats = function (s) { return s; };
        Converter.status = function (s) { return ({
            id: s.id,
            uri: s.uri,
            url: s.url,
            account: Converter.account(s.account),
            in_reply_to_id: s.in_reply_to_id,
            in_reply_to_account_id: s.in_reply_to_account_id,
            reblog: s.reblog ? Converter.status(s.reblog) : null,
            content: s.content,
            plain_content: null,
            created_at: s.created_at,
            edited_at: null,
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
            emoji_reactions: [],
            bookmarked: s.bookmarked ? s.bookmarked : false,
            quote: false
        }); };
        Converter.status_params = function (s) { return s; };
        Converter.tag = function (t) { return ({
            name: t.name,
            url: t.url,
            history: []
        }); };
        Converter.token = function (t) { return t; };
        Converter.urls = function (u) { return u; };
        Converter.filter = function (f) { return f; };
        Converter.status_source = function (s) { return s; };
    })(Converter = GotosocialAPI.Converter || (GotosocialAPI.Converter = {}));
})(GotosocialAPI || (GotosocialAPI = {}));
export default GotosocialAPI;
