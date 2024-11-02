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
import dayjs from 'dayjs';
import FormData from 'form-data';
import { DEFAULT_UA } from '../default';
import WebSocket from './web_socket';
import FirefishNotificationType from './notification';
import NotificationType, { UnknownNotificationTypeError } from '../notification';
var FirefishAPI;
(function (FirefishAPI) {
    var Converter;
    (function (Converter) {
        Converter.announcement = function (a) { return ({
            id: a.id,
            content: a.title + '\n' + a.text,
            starts_at: null,
            ends_at: null,
            published: true,
            all_day: true,
            published_at: a.createdAt,
            updated_at: a.updatedAt,
            read: a.isRead !== undefined ? a.isRead : null,
            mentions: [],
            statuses: [],
            tags: [],
            emojis: [],
            reactions: []
        }); };
        Converter.emoji = function (e) {
            return {
                shortcode: e.name,
                static_url: e.url,
                url: e.url,
                visible_in_picker: true,
                category: e.category ? e.category : undefined
            };
        };
        Converter.user = function (u) {
            var _a, _b;
            var acct = u.username;
            if (u.host) {
                acct = "".concat(u.username, "@").concat(u.host);
            }
            return {
                id: u.id,
                username: u.username,
                acct: acct,
                display_name: u.name ? u.name : '',
                locked: false,
                group: null,
                noindex: u.isIndexable !== undefined ? u.isIndexable : null,
                suspended: null,
                limited: null,
                created_at: new Date().toISOString(),
                followers_count: 0,
                following_count: 0,
                statuses_count: 0,
                note: '',
                url: acct,
                avatar: (_a = u.avatarUrl) !== null && _a !== void 0 ? _a : '',
                avatar_static: (_b = u.avatarColor) !== null && _b !== void 0 ? _b : '',
                header: '',
                header_static: '',
                emojis: Array.isArray(u.emojis) ? u.emojis.map(function (e) { return Converter.emoji(e); }) : [],
                moved: null,
                fields: [],
                bot: null
            };
        };
        Converter.userDetail = function (u) {
            var _a, _b, _c, _d, _e, _f, _g;
            var acct = u.username;
            if (u.host) {
                acct = "".concat(u.username, "@").concat(u.host);
            }
            return {
                id: u.id,
                username: u.username,
                acct: acct,
                display_name: (_a = u.name) !== null && _a !== void 0 ? _a : '',
                locked: u.isLocked,
                group: null,
                noindex: u.isIndexable !== undefined ? u.isIndexable : null,
                suspended: u.isSuspended,
                limited: u.isSilenced,
                created_at: u.createdAt,
                followers_count: u.followersCount,
                following_count: u.followingCount,
                statuses_count: u.notesCount,
                note: (_b = u.description) !== null && _b !== void 0 ? _b : '',
                url: acct,
                avatar: (_c = u.avatarUrl) !== null && _c !== void 0 ? _c : '',
                avatar_static: (_d = u.avatarColor) !== null && _d !== void 0 ? _d : '',
                header: (_e = u.bannerUrl) !== null && _e !== void 0 ? _e : '',
                header_static: (_f = u.bannerColor) !== null && _f !== void 0 ? _f : '',
                emojis: Array.isArray(u.emojis) ? u.emojis.map(function (e) { return Converter.emoji(e); }) : [],
                moved: null,
                fields: u.fields.map(function (f) { return field(f); }),
                bot: u.isBot !== undefined ? u.isBot : null,
                source: {
                    privacy: null,
                    sensitive: null,
                    language: u.lang,
                    note: (_g = u.description) !== null && _g !== void 0 ? _g : '',
                    fields: []
                }
            };
        };
        Converter.userDetailMe = function (u) {
            var _a;
            var account = Converter.userDetail(u);
            return Object.assign({}, account, {
                source: {
                    privacy: null,
                    sensitive: u.alwaysMarkNsfw,
                    language: u.lang,
                    note: (_a = u.description) !== null && _a !== void 0 ? _a : '',
                    fields: []
                }
            });
        };
        Converter.userPreferences = function (u, v) {
            return {
                'reading:expand:media': 'default',
                'reading:expand:spoilers': false,
                'posting:default:language': u.lang,
                'posting:default:sensitive': u.alwaysMarkNsfw,
                'posting:default:visibility': v
            };
        };
        Converter.visibility = function (v) {
            switch (v) {
                case 'public':
                    return v;
                case 'home':
                    return 'unlisted';
                case 'followers':
                    return 'private';
                case 'specified':
                    return 'direct';
                case 'hidden':
                    return 'direct';
                default:
                    return 'public';
            }
        };
        Converter.encodeVisibility = function (v) {
            switch (v) {
                case 'public':
                    return v;
                case 'unlisted':
                    return 'home';
                case 'private':
                    return 'followers';
                case 'direct':
                    return 'specified';
            }
        };
        Converter.fileType = function (s) {
            if (s === 'image/gif') {
                return 'gifv';
            }
            if (s.includes('image')) {
                return 'image';
            }
            if (s.includes('video')) {
                return 'video';
            }
            if (s.includes('audio')) {
                return 'audio';
            }
            return 'unknown';
        };
        Converter.file = function (f) {
            return {
                id: f.id,
                type: Converter.fileType(f.type),
                url: f.url ? f.url : '',
                remote_url: f.url,
                preview_url: f.thumbnailUrl,
                text_url: f.url,
                meta: {
                    width: f.properties.width,
                    height: f.properties.height
                },
                description: f.comment,
                blurhash: f.blurhash
            };
        };
        Converter.follower = function (f) {
            return Converter.user(f.follower);
        };
        Converter.following = function (f) {
            return Converter.user(f.followee);
        };
        Converter.relation = function (r) {
            return {
                id: r.id,
                following: r.isFollowing,
                followed_by: r.isFollowed,
                blocking: r.isBlocking,
                blocked_by: r.isBlocked,
                muting: r.isMuted,
                muting_notifications: false,
                requested: r.hasPendingFollowRequestFromYou,
                domain_blocking: false,
                showing_reblogs: true,
                endorsed: false,
                notifying: false,
                note: null
            };
        };
        Converter.choice = function (c) {
            return {
                title: c.text,
                votes_count: c.votes
            };
        };
        Converter.poll = function (p) {
            var now = dayjs();
            var expire = dayjs(p.expiresAt);
            var count = p.choices.reduce(function (sum, choice) { return sum + choice.votes; }, 0);
            return {
                id: '',
                expires_at: p.expiresAt,
                expired: now.isAfter(expire),
                multiple: p.multiple,
                votes_count: count,
                options: Array.isArray(p.choices) ? p.choices.map(function (c) { return Converter.choice(c); }) : [],
                voted: Array.isArray(p.choices) ? p.choices.some(function (c) { return c.isVoted; }) : false
            };
        };
        Converter.note = function (n) {
            var _a, _b;
            return {
                id: n.id,
                uri: n.uri ? n.uri : '',
                url: n.uri ? n.uri : '',
                account: Converter.user(n.user),
                in_reply_to_id: n.replyId ? n.replyId : null,
                in_reply_to_account_id: (_b = (_a = n.reply) === null || _a === void 0 ? void 0 : _a.userId) !== null && _b !== void 0 ? _b : null,
                reblog: n.renote ? Converter.note(n.renote) : null,
                content: n.text
                    ? n.text
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&#39;')
                        .replace(/`/g, '&#x60;')
                        .replace(/\r?\n/g, '<br>')
                    : '',
                plain_content: n.text ? n.text : null,
                created_at: n.createdAt,
                edited_at: null,
                emojis: Array.isArray(n.emojis) ? n.emojis.filter(function (e) { return !e.name.includes('@'); }).map(function (e) { return Converter.emoji(e); }) : [],
                replies_count: n.repliesCount,
                reblogs_count: n.renoteCount,
                favourites_count: 0,
                reblogged: false,
                favourited: !!n.myReaction,
                muted: false,
                sensitive: Array.isArray(n.files) ? n.files.some(function (f) { return f.isSensitive; }) : false,
                spoiler_text: n.cw ? n.cw : '',
                visibility: Converter.visibility(n.visibility),
                media_attachments: Array.isArray(n.files) ? n.files.map(function (f) { return Converter.file(f); }) : [],
                mentions: [],
                tags: [],
                card: null,
                poll: n.poll ? Converter.poll(n.poll) : null,
                application: null,
                language: null,
                pinned: null,
                emoji_reactions: Converter.mapReactions(n.emojis ? n.emojis : [], n.reactions, n.myReaction),
                bookmarked: false,
                quote: n.renote !== undefined && n.text !== null
            };
        };
        Converter.mapReactions = function (emojis, r, myReaction) {
            var emojiUrls = new Map(emojis.map(function (e) { return [e.name, e.url]; }));
            return Object.keys(r).map(function (key) {
                var shortcode = key.replace(/:/g, '');
                var url = emojiUrls.get(shortcode);
                var name = shortcode.replace('@.', '');
                return {
                    count: r[key],
                    me: key === myReaction,
                    name: name,
                    url: url,
                    static_url: url
                };
            });
        };
        Converter.reactions = function (r) {
            var result = [];
            r.map(function (e) {
                var i = result.findIndex(function (res) { return res.name === e.type; });
                if (i >= 0) {
                    result[i].count++;
                }
                else {
                    result.push({
                        count: 1,
                        me: false,
                        name: e.type
                    });
                }
            });
            return result;
        };
        Converter.noteToConversation = function (n) {
            var accounts = [Converter.user(n.user)];
            if (n.reply) {
                accounts.push(Converter.user(n.reply.user));
            }
            return {
                id: n.id,
                accounts: accounts,
                last_status: Converter.note(n),
                unread: false
            };
        };
        Converter.list = function (l) { return ({
            id: l.id,
            title: l.name,
            replies_policy: null
        }); };
        Converter.encodeNotificationType = function (e) {
            switch (e) {
                case NotificationType.Follow:
                    return FirefishNotificationType.Follow;
                case NotificationType.Mention:
                    return FirefishNotificationType.Reply;
                case NotificationType.Favourite:
                case NotificationType.Reaction:
                    return FirefishNotificationType.Reaction;
                case NotificationType.Reblog:
                    return FirefishNotificationType.Renote;
                case NotificationType.PollVote:
                    return FirefishNotificationType.PollVote;
                case NotificationType.FollowRequest:
                    return FirefishNotificationType.ReceiveFollowRequest;
                default:
                    return new UnknownNotificationTypeError();
            }
        };
        Converter.decodeNotificationType = function (e) {
            switch (e) {
                case FirefishNotificationType.Follow:
                    return NotificationType.Follow;
                case FirefishNotificationType.Mention:
                case FirefishNotificationType.Reply:
                    return NotificationType.Mention;
                case FirefishNotificationType.Renote:
                case FirefishNotificationType.Quote:
                    return NotificationType.Reblog;
                case FirefishNotificationType.Reaction:
                    return NotificationType.Reaction;
                case FirefishNotificationType.PollVote:
                    return NotificationType.PollVote;
                case FirefishNotificationType.ReceiveFollowRequest:
                    return NotificationType.FollowRequest;
                case FirefishNotificationType.FollowRequestAccepted:
                    return NotificationType.Follow;
                default:
                    return new UnknownNotificationTypeError();
            }
        };
        Converter.notification = function (n) {
            var _a;
            var _b, _c;
            var notificationType = Converter.decodeNotificationType(n.type);
            if (notificationType instanceof UnknownNotificationTypeError) {
                return notificationType;
            }
            var notification = {
                id: n.id,
                account: n.user ? Converter.user(n.user) : null,
                created_at: n.createdAt,
                type: notificationType
            };
            if (n.note) {
                notification = Object.assign(notification, {
                    status: Converter.note(n.note)
                });
            }
            if (n.reaction) {
                var reactions_1 = Converter.mapReactions((_c = (_b = n.note) === null || _b === void 0 ? void 0 : _b.emojis) !== null && _c !== void 0 ? _c : [], (_a = {}, _a[n.reaction] = 1, _a));
                if (reactions_1.length > 0) {
                    notification = Object.assign(notification, {
                        reaction: reactions_1[0]
                    });
                }
            }
            return notification;
        };
        Converter.stats = function (s) {
            return {
                user_count: s.usersCount,
                status_count: s.notesCount,
                domain_count: s.instances
            };
        };
        Converter.meta = function (m, s) {
            var wss = m.uri.replace(/^https:\/\//, 'wss://');
            return {
                uri: m.uri,
                title: m.name,
                description: m.description ? m.description : '',
                email: m.maintainerEmail ? m.maintainerEmail : '',
                version: m.version,
                thumbnail: m.bannerUrl,
                urls: {
                    streaming_api: "".concat(wss, "/streaming")
                },
                stats: Converter.stats(s),
                languages: m.langs,
                registrations: !m.disableRegistration,
                approval_required: false,
                configuration: {
                    statuses: {
                        max_characters: m.maxNoteTextLength
                    }
                }
            };
        };
        var account_emoji = function (e) {
            return {
                shortcode: e.shortcode,
                static_url: e.static_url,
                url: e.url,
                visible_in_picker: e.visible_in_picker
            };
        };
        var field = function (f) {
            return {
                name: f.name,
                value: f.value,
                verified: f.verified,
                verified_at: null
            };
        };
        Converter.instance = function (i) {
            return {
                uri: i.uri,
                title: i.title,
                description: i.description,
                email: i.email,
                version: i.version,
                thumbnail: i.thumbnail,
                urls: i.urls,
                stats: {
                    user_count: i.stats.user_count,
                    status_count: i.stats.status_count,
                    domain_count: i.stats.domain_count
                },
                languages: i.languages,
                registrations: i.registrations,
                approval_required: i.approval_required,
                invites_enabled: i.invites_enabled,
                configuration: {
                    statuses: {
                        max_characters: i.configuration.statuses.max_characters,
                        max_media_attachments: i.configuration.statuses.max_media_attachments,
                        characters_reserved_per_url: i.configuration.statuses.characters_reserved_per_url
                    },
                    polls: {
                        max_options: i.configuration.polls.max_options,
                        max_characters_per_option: i.configuration.polls.max_characters_per_option,
                        min_expiration: i.configuration.polls.min_expiration,
                        max_expiration: i.configuration.polls.max_expiration
                    }
                },
                contact_account: {
                    id: i.contact_account.id,
                    username: i.contact_account.username,
                    acct: i.contact_account.acct,
                    display_name: i.contact_account.display_name,
                    locked: i.contact_account.locked,
                    group: null,
                    noindex: null,
                    suspended: null,
                    limited: null,
                    created_at: i.contact_account.created_at,
                    followers_count: i.contact_account.followers_count,
                    following_count: i.contact_account.following_count,
                    statuses_count: i.contact_account.statuses_count,
                    note: i.contact_account.note,
                    url: i.contact_account.url,
                    avatar: i.contact_account.avatar,
                    avatar_static: i.contact_account.avatar_static,
                    header: i.contact_account.header,
                    header_static: i.contact_account.header_static,
                    emojis: i.contact_account.emojis.map(function (e) { return account_emoji(e); }),
                    moved: null,
                    fields: i.contact_account.fields.map(function (f) { return field(f); }),
                    bot: i.contact_account.bot
                }
            };
        };
        Converter.hashtag = function (h) {
            return {
                name: h.tag,
                url: h.tag,
                history: [],
                following: false
            };
        };
    })(Converter = FirefishAPI.Converter || (FirefishAPI.Converter = {}));
    FirefishAPI.DEFAULT_SCOPE = [
        'read:account',
        'write:account',
        'read:blocks',
        'write:blocks',
        'read:drive',
        'write:drive',
        'read:favorites',
        'write:favorites',
        'read:following',
        'write:following',
        'read:mutes',
        'write:mutes',
        'write:notes',
        'read:notifications',
        'write:notifications',
        'read:reactions',
        'write:reactions',
        'write:votes'
    ];
    var Client = (function () {
        function Client(baseUrl, accessToken, userAgent) {
            if (userAgent === void 0) { userAgent = DEFAULT_UA; }
            this.accessToken = accessToken;
            this.baseUrl = baseUrl;
            this.userAgent = userAgent;
            this.abortController = new AbortController();
            axios.defaults.signal = this.abortController.signal;
        }
        Client.prototype.get = function (path_1) {
            return __awaiter(this, arguments, void 0, function (path, params, headers) {
                var options;
                if (params === void 0) { params = {}; }
                if (headers === void 0) { headers = {}; }
                return __generator(this, function (_a) {
                    options = {
                        params: params,
                        headers: headers,
                        maxContentLength: Infinity,
                        maxBodyLength: Infinity
                    };
                    return [2, axios.get(this.baseUrl + path, options).then(function (resp) {
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
                var options, bodyParams;
                if (params === void 0) { params = {}; }
                if (headers === void 0) { headers = {}; }
                return __generator(this, function (_a) {
                    options = {
                        headers: headers,
                        maxContentLength: Infinity,
                        maxBodyLength: Infinity
                    };
                    bodyParams = params;
                    if (this.accessToken) {
                        if (params instanceof FormData) {
                            bodyParams.append('i', this.accessToken);
                        }
                        else {
                            bodyParams = Object.assign(params, {
                                i: this.accessToken
                            });
                        }
                    }
                    return [2, axios.post(this.baseUrl + path, bodyParams, options).then(function (resp) {
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
        Client.prototype.socket = function (url, channel, listId) {
            if (!this.accessToken) {
                throw new Error('accessToken is required');
            }
            var streaming = new WebSocket(url, channel, this.accessToken, listId, this.userAgent);
            streaming.start();
            return streaming;
        };
        return Client;
    }());
    FirefishAPI.Client = Client;
})(FirefishAPI || (FirefishAPI = {}));
export default FirefishAPI;
