import MastodonAPI from '@/mastodon/api_client';
import MegalodonNotificationType from '@/notification';
import MastodonNotificationType from '@/mastodon/notification';
describe('api_client', function () {
    describe('notification', function () {
        describe('encode', function () {
            it('megalodon notification type should be encoded to mastodon notification type', function () {
                var cases = [
                    {
                        src: MegalodonNotificationType.Follow,
                        dist: MastodonNotificationType.Follow
                    },
                    {
                        src: MegalodonNotificationType.Favourite,
                        dist: MastodonNotificationType.Favourite
                    },
                    {
                        src: MegalodonNotificationType.Reblog,
                        dist: MastodonNotificationType.Reblog
                    },
                    {
                        src: MegalodonNotificationType.Mention,
                        dist: MastodonNotificationType.Mention
                    },
                    {
                        src: MegalodonNotificationType.PollExpired,
                        dist: MastodonNotificationType.Poll
                    },
                    {
                        src: MegalodonNotificationType.FollowRequest,
                        dist: MastodonNotificationType.FollowRequest
                    },
                    {
                        src: MegalodonNotificationType.Status,
                        dist: MastodonNotificationType.Status
                    }
                ];
                cases.forEach(function (c) {
                    expect(MastodonAPI.Converter.encodeNotificationType(c.src)).toEqual(c.dist);
                });
            });
        });
        describe('decode', function () {
            it('mastodon notification type should be decoded to megalodon notification type', function () {
                var cases = [
                    {
                        src: MastodonNotificationType.Follow,
                        dist: MegalodonNotificationType.Follow
                    },
                    {
                        src: MastodonNotificationType.Favourite,
                        dist: MegalodonNotificationType.Favourite
                    },
                    {
                        src: MastodonNotificationType.Mention,
                        dist: MegalodonNotificationType.Mention
                    },
                    {
                        src: MastodonNotificationType.Reblog,
                        dist: MegalodonNotificationType.Reblog
                    },
                    {
                        src: MastodonNotificationType.Poll,
                        dist: MegalodonNotificationType.PollExpired
                    },
                    {
                        src: MastodonNotificationType.FollowRequest,
                        dist: MegalodonNotificationType.FollowRequest
                    }
                ];
                cases.forEach(function (c) {
                    expect(MastodonAPI.Converter.decodeNotificationType(c.src)).toEqual(c.dist);
                });
            });
        });
    });
});
