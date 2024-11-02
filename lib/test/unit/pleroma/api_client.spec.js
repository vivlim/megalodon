"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_client_1 = __importDefault(require("@/pleroma/api_client"));
var notification_1 = __importDefault(require("@/notification"));
var notification_2 = __importDefault(require("@/pleroma/notification"));
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
describe('api_client', function () {
    describe('notification', function () {
        describe('encode', function () {
            it('megalodon notification type should be encoded to pleroma notification type', function () {
                var cases = [
                    {
                        src: notification_1.default.Follow,
                        dist: notification_2.default.Follow
                    },
                    {
                        src: notification_1.default.Favourite,
                        dist: notification_2.default.Favourite
                    },
                    {
                        src: notification_1.default.Reblog,
                        dist: notification_2.default.Reblog
                    },
                    {
                        src: notification_1.default.Mention,
                        dist: notification_2.default.Mention
                    },
                    {
                        src: notification_1.default.PollExpired,
                        dist: notification_2.default.Poll
                    },
                    {
                        src: notification_1.default.Reaction,
                        dist: notification_2.default.PleromaEmojiReaction
                    },
                    {
                        src: notification_1.default.FollowRequest,
                        dist: notification_2.default.FollowRequest
                    },
                    {
                        src: notification_1.default.Update,
                        dist: notification_2.default.Update
                    },
                    {
                        src: notification_1.default.Move,
                        dist: notification_2.default.Move
                    },
                    {
                        src: notification_1.default.Status,
                        dist: notification_2.default.Status
                    }
                ];
                cases.forEach(function (c) {
                    expect(api_client_1.default.Converter.encodeNotificationType(c.src)).toEqual(c.dist);
                });
            });
        });
        describe('decode', function () {
            it('pleroma notification type should be decoded to megalodon notification type', function () {
                var cases = [
                    {
                        src: notification_2.default.Follow,
                        dist: notification_1.default.Follow
                    },
                    {
                        src: notification_2.default.Favourite,
                        dist: notification_1.default.Favourite
                    },
                    {
                        src: notification_2.default.Mention,
                        dist: notification_1.default.Mention
                    },
                    {
                        src: notification_2.default.Reblog,
                        dist: notification_1.default.Reblog
                    },
                    {
                        src: notification_2.default.Poll,
                        dist: notification_1.default.PollExpired
                    },
                    {
                        src: notification_2.default.PleromaEmojiReaction,
                        dist: notification_1.default.Reaction
                    },
                    {
                        src: notification_2.default.FollowRequest,
                        dist: notification_1.default.FollowRequest
                    },
                    {
                        src: notification_2.default.Update,
                        dist: notification_1.default.Update
                    },
                    {
                        src: notification_2.default.Move,
                        dist: notification_1.default.Move
                    },
                    {
                        src: notification_2.default.Status,
                        dist: notification_1.default.Status
                    }
                ];
                cases.forEach(function (c) {
                    expect(api_client_1.default.Converter.decodeNotificationType(c.src)).toEqual(c.dist);
                });
            });
        });
    });
    describe('status', function () {
        describe('plain content is included', function () {
            it('plain content in pleroma entity should be exported in plain_content column', function () {
                var plainContent = 'hoge\nfuga\nfuga';
                var content = '<p>hoge<br>fuga<br>fuga</p>';
                var pleromaStatus = {
                    id: '1',
                    uri: 'https://pleroma.io/notice/1',
                    url: 'https://pleroma.io/notice/1',
                    account: account,
                    in_reply_to_id: null,
                    in_reply_to_account_id: null,
                    reblog: null,
                    content: content,
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
                        content: {
                            'text/plain': plainContent
                        },
                        local: false
                    }
                };
                var megalodonStatus = api_client_1.default.Converter.status(pleromaStatus);
                expect(megalodonStatus.plain_content).toEqual(plainContent);
                expect(megalodonStatus.content).toEqual(content);
            });
        });
        describe('plain content is not included', function () {
            it('plain_content should be null', function () {
                var content = '<p>hoge<br>fuga<br>fuga</p>';
                var pleromaStatus = {
                    id: '1',
                    uri: 'https://pleroma.io/notice/1',
                    url: 'https://pleroma.io/notice/1',
                    account: account,
                    in_reply_to_id: null,
                    in_reply_to_account_id: null,
                    reblog: null,
                    content: content,
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
                var megalodonStatus = api_client_1.default.Converter.status(pleromaStatus);
                expect(megalodonStatus.plain_content).toBeNull();
                expect(megalodonStatus.content).toEqual(content);
            });
        });
    });
});