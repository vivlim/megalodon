import FriendicaAPI from './friendica/api_client';
import WebSocket from './friendica/web_socket';
import { MegalodonInterface } from './megalodon';
import Response from './response';
import Entity from './entity';
import OAuth from './oauth';
export default class Friendica implements MegalodonInterface {
    client: FriendicaAPI.Interface;
    baseUrl: string;
    constructor(baseUrl: string, accessToken?: string | null, userAgent?: string | null);
    cancel(): void;
    registerApp(client_name: string, options: Partial<{
        scopes: Array<string>;
        redirect_uris: string;
        website: string;
    }>): Promise<OAuth.AppData>;
    createApp(client_name: string, options: Partial<{
        scopes: Array<string>;
        redirect_uris: string;
        website: string;
    }>): Promise<OAuth.AppData>;
    generateAuthUrl(clientId: string, clientSecret: string, options: Partial<{
        scope: Array<string>;
        redirect_uri: string | null;
    }>): Promise<string>;
    verifyAppCredentials(): Promise<Response<Entity.Application>>;
    fetchAccessToken(client_id: string | null, client_secret: string, code: string, redirect_uri?: string): Promise<OAuth.TokenData>;
    refreshToken(client_id: string, client_secret: string, refresh_token: string): Promise<OAuth.TokenData>;
    revokeToken(client_id: string, client_secret: string, token: string): Promise<Response<Record<string, unknown>>>;
    registerAccount(_username: string, _email: string, _password: string, _agreement: boolean, _locale: string, _reason?: string | null): Promise<Response<Entity.Token>>;
    verifyAccountCredentials(): Promise<Response<Entity.Account>>;
    updateCredentials(_options?: {
        discoverable?: boolean;
        bot?: boolean;
        display_name?: string;
        note?: string;
        avatar?: string;
        header?: string;
        locked?: boolean;
        source?: {
            privacy?: string;
            sensitive?: boolean;
            language?: string;
        };
        fields_attributes?: Array<{
            name: string;
            value: string;
        }>;
    }): Promise<Response<Entity.Account>>;
    getAccount(id: string): Promise<Response<Entity.Account>>;
    getAccountStatuses(id: string, options?: {
        limit?: number;
        max_id?: string;
        since_id?: string;
        min_id?: string;
        pinned?: boolean;
        exclude_replies?: boolean;
        exclude_reblogs?: boolean;
        only_media: boolean;
    }): Promise<Response<Array<Entity.Status>>>;
    subscribeAccount(id: string): Promise<Response<Entity.Relationship>>;
    unsubscribeAccount(id: string): Promise<Response<Entity.Relationship>>;
    getAccountFavourites(_id: string, _options?: {
        limit?: number;
        max_id?: string;
        since_id?: string;
    }): Promise<Response<Array<Entity.Status>>>;
    getAccountFollowers(id: string, options?: {
        limit?: number;
        max_id?: string;
        since_id?: string;
        get_all?: boolean;
        sleep_ms?: number;
    }): Promise<Response<Array<Entity.Account>>>;
    getAccountFollowing(id: string, options?: {
        limit?: number;
        max_id?: string;
        since_id?: string;
        get_all?: boolean;
        sleep_ms?: number;
    }): Promise<Response<Array<Entity.Account>>>;
    private urlToAccounts;
    getAccountLists(id: string): Promise<Response<Array<Entity.List>>>;
    getIdentityProof(id: string): Promise<Response<Array<Entity.IdentityProof>>>;
    followAccount(id: string, options?: {
        reblog?: boolean;
    }): Promise<Response<Entity.Relationship>>;
    unfollowAccount(id: string): Promise<Response<Entity.Relationship>>;
    blockAccount(id: string): Promise<Response<Entity.Relationship>>;
    unblockAccount(id: string): Promise<Response<Entity.Relationship>>;
    muteAccount(id: string, notifications?: boolean): Promise<Response<Entity.Relationship>>;
    unmuteAccount(id: string): Promise<Response<Entity.Relationship>>;
    pinAccount(_id: string): Promise<Response<Entity.Relationship>>;
    unpinAccount(_id: string): Promise<Response<Entity.Relationship>>;
    setAccountNote(_id: string): Promise<Response<Entity.Relationship>>;
    getRelationship(id: string): Promise<Response<Entity.Relationship>>;
    getRelationships(ids: Array<string>): Promise<Response<Array<Entity.Relationship>>>;
    searchAccount(q: string, options?: {
        following?: boolean;
        resolve?: boolean;
        limit?: number;
        max_id?: string;
        since_id?: string;
    }): Promise<Response<Array<Entity.Account>>>;
    lookupAccount(_acct: string): Promise<Response<Entity.Account>>;
    getBookmarks(options?: {
        limit?: number;
        max_id?: string;
        since_id?: string;
        min_id?: string;
    }): Promise<Response<Array<Entity.Status>>>;
    getFavourites(options?: {
        limit?: number;
        max_id?: string;
        min_id?: string;
    }): Promise<Response<Array<Entity.Status>>>;
    getMutes(options?: {
        limit?: number;
        max_id?: string;
        min_id?: string;
    }): Promise<Response<Array<Entity.Account>>>;
    getBlocks(options?: {
        limit?: number;
        max_id?: string;
        min_id?: string;
    }): Promise<Response<Array<Entity.Account>>>;
    getDomainBlocks(_options?: {
        limit?: number;
        max_id?: string;
        min_id?: string;
    }): Promise<Response<Array<string>>>;
    blockDomain(_domain: string): Promise<Response<Record<string, unknown>>>;
    unblockDomain(_domain: string): Promise<Response<Record<string, unknown>>>;
    getFilters(): Promise<Response<Array<Entity.Filter>>>;
    getFilter(_id: string): Promise<Response<Entity.Filter>>;
    createFilter(_phrase: string, _context: Array<Entity.FilterContext>, _options?: {
        irreversible?: boolean;
        whole_word?: boolean;
        expires_in?: string;
    }): Promise<Response<Entity.Filter>>;
    updateFilter(_id: string, _phrase: string, _context: Array<Entity.FilterContext>, _options?: {
        irreversible?: boolean;
        whole_word?: boolean;
        expires_in?: string;
    }): Promise<Response<Entity.Filter>>;
    deleteFilter(_id: string): Promise<Response<Entity.Filter>>;
    report(_account_id: string, _options?: {
        status_ids?: Array<string>;
        comment: string;
        forward?: boolean;
        category?: Entity.Category;
        rule_ids?: Array<number>;
    }): Promise<Response<Entity.Report>>;
    getFollowRequests(limit?: number): Promise<Response<Array<Entity.FollowRequest>>>;
    acceptFollowRequest(id: string): Promise<Response<Entity.Relationship>>;
    rejectFollowRequest(id: string): Promise<Response<Entity.Relationship>>;
    getEndorsements(options?: {
        limit?: number;
        max_id?: string;
        since_id?: string;
    }): Promise<Response<Array<Entity.Account>>>;
    getFeaturedTags(): Promise<Response<Array<Entity.FeaturedTag>>>;
    createFeaturedTag(_name: string): Promise<Response<Entity.FeaturedTag>>;
    deleteFeaturedTag(_id: string): Promise<Response<Record<string, unknown>>>;
    getSuggestedTags(): Promise<Response<Array<Entity.Tag>>>;
    getPreferences(): Promise<Response<Entity.Preferences>>;
    getFollowedTags(): Promise<Response<Array<Entity.Tag>>>;
    getSuggestions(limit?: number): Promise<Response<Array<Entity.Account>>>;
    getTag(id: string): Promise<Response<Entity.Tag>>;
    followTag(id: string): Promise<Response<Entity.Tag>>;
    unfollowTag(id: string): Promise<Response<Entity.Tag>>;
    postStatus(status: string, options: {
        media_ids?: Array<string>;
        poll?: {
            options: Array<string>;
            expires_in: number;
            multiple?: boolean;
            hide_totals?: boolean;
        };
        in_reply_to_id?: string;
        sensitive?: boolean;
        spoiler_text?: string;
        visibility?: Entity.StatusVisibility;
        scheduled_at?: string;
        language?: string;
        quote_id?: string;
    }): Promise<Response<Entity.Status | Entity.ScheduledStatus>>;
    getStatus(id: string): Promise<Response<Entity.Status>>;
    editStatus(id: string, options: {
        status?: string;
        spoiler_text?: string;
        sensitive?: boolean;
        media_ids?: Array<string>;
        poll?: {
            options?: Array<string>;
            expires_in?: number;
            multiple?: boolean;
            hide_totals?: boolean;
        };
    }): Promise<Response<Entity.Status>>;
    deleteStatus(id: string): Promise<Response<Entity.Status>>;
    getStatusContext(id: string, options?: {
        limit?: number;
        max_id?: string;
        since_id?: string;
    }): Promise<Response<Entity.Context>>;
    getStatusSource(id: string): Promise<Response<Entity.StatusSource>>;
    getStatusRebloggedBy(id: string): Promise<Response<Array<Entity.Account>>>;
    getStatusFavouritedBy(id: string): Promise<Response<Array<Entity.Account>>>;
    favouriteStatus(id: string): Promise<Response<Entity.Status>>;
    unfavouriteStatus(id: string): Promise<Response<Entity.Status>>;
    reblogStatus(id: string): Promise<Response<Entity.Status>>;
    unreblogStatus(id: string): Promise<Response<Entity.Status>>;
    bookmarkStatus(id: string): Promise<Response<Entity.Status>>;
    unbookmarkStatus(id: string): Promise<Response<Entity.Status>>;
    muteStatus(id: string): Promise<Response<Entity.Status>>;
    unmuteStatus(id: string): Promise<Response<Entity.Status>>;
    pinStatus(id: string): Promise<Response<Entity.Status>>;
    unpinStatus(id: string): Promise<Response<Entity.Status>>;
    uploadMedia(file: any, options?: {
        description?: string;
        focus?: string;
    }): Promise<Response<Entity.Attachment | Entity.AsyncAttachment>>;
    getMedia(id: string): Promise<Response<Entity.Attachment>>;
    updateMedia(id: string, options?: {
        file?: any;
        description?: string;
        focus?: string;
    }): Promise<Response<Entity.Attachment>>;
    getPoll(id: string): Promise<Response<Entity.Poll>>;
    votePoll(_id: string, _choices: Array<number>): Promise<Response<Entity.Poll>>;
    getScheduledStatuses(options?: {
        limit?: number | null;
        max_id?: string | null;
        since_id?: string | null;
        min_id?: string | null;
    }): Promise<Response<Array<Entity.ScheduledStatus>>>;
    getScheduledStatus(id: string): Promise<Response<Entity.ScheduledStatus>>;
    scheduleStatus(_id: string, _scheduled_at?: string | null): Promise<Response<Entity.ScheduledStatus>>;
    cancelScheduledStatus(id: string): Promise<Response<Record<string, unknown>>>;
    getPublicTimeline(options?: {
        only_media?: boolean;
        limit?: number;
        max_id?: string;
        since_id?: string;
        min_id?: string;
    }): Promise<Response<Array<Entity.Status>>>;
    getLocalTimeline(options?: {
        only_media?: boolean;
        limit?: number;
        max_id?: string;
        since_id?: string;
        min_id?: string;
    }): Promise<Response<Array<Entity.Status>>>;
    getTagTimeline(hashtag: string, options?: {
        local?: boolean;
        only_media?: boolean;
        limit?: number;
        max_id?: string;
        since_id?: string;
        min_id?: string;
    }): Promise<Response<Array<Entity.Status>>>;
    getHomeTimeline(options?: {
        local?: boolean;
        limit?: number;
        max_id?: string;
        since_id?: string;
        min_id?: string;
    }): Promise<Response<Array<Entity.Status>>>;
    getListTimeline(list_id: string, options?: {
        limit?: number;
        max_id?: string;
        since_id?: string;
        min_id?: string;
    }): Promise<Response<Array<Entity.Status>>>;
    getConversationTimeline(options?: {
        limit?: number;
        max_id?: string;
        since_id?: string;
        min_id?: string;
    }): Promise<Response<Array<Entity.Conversation>>>;
    deleteConversation(id: string): Promise<Response<Record<string, unknown>>>;
    readConversation(id: string): Promise<Response<Entity.Conversation>>;
    getLists(): Promise<Response<Array<Entity.List>>>;
    getList(id: string): Promise<Response<Entity.List>>;
    createList(title: string): Promise<Response<Entity.List>>;
    updateList(id: string, title: string): Promise<Response<Entity.List>>;
    deleteList(id: string): Promise<Response<Record<string, unknown>>>;
    getAccountsInList(id: string, options?: {
        limit?: number;
        max_id?: string;
        since_id?: string;
    }): Promise<Response<Array<Entity.Account>>>;
    addAccountsToList(id: string, account_ids: Array<string>): Promise<Response<Record<string, unknown>>>;
    deleteAccountsFromList(id: string, account_ids: Array<string>): Promise<Response<Record<string, unknown>>>;
    getMarkers(_timeline: Array<string>): Promise<Response<Entity.Marker | Record<string, unknown>>>;
    saveMarkers(_options?: {
        home?: {
            last_read_id: string;
        };
        notifications?: {
            last_read_id: string;
        };
    }): Promise<Response<Entity.Marker>>;
    getNotifications(options?: {
        limit?: number;
        max_id?: string;
        since_id?: string;
        min_id?: string;
        exclude_types?: Array<Entity.NotificationType>;
        account_id?: string;
    }): Promise<Response<Array<Entity.Notification>>>;
    getNotification(id: string): Promise<Response<Entity.Notification>>;
    dismissNotifications(): Promise<Response<Record<string, unknown>>>;
    dismissNotification(id: string): Promise<Response<Record<string, unknown>>>;
    readNotifications(_options: {
        id?: string;
        max_id?: string;
    }): Promise<Response<{}>>;
    subscribePushNotification(subscription: {
        endpoint: string;
        keys: {
            p256dh: string;
            auth: string;
        };
    }, data?: {
        alerts: {
            follow?: boolean;
            favourite?: boolean;
            reblog?: boolean;
            mention?: boolean;
            poll?: boolean;
        };
    } | null): Promise<Response<Entity.PushSubscription>>;
    getPushSubscription(): Promise<Response<Entity.PushSubscription>>;
    updatePushSubscription(data?: {
        alerts: {
            follow?: boolean;
            favourite?: boolean;
            reblog?: boolean;
            mention?: boolean;
            poll?: boolean;
        };
    } | null): Promise<Response<Entity.PushSubscription>>;
    deletePushSubscription(): Promise<Response<Record<string, unknown>>>;
    search(q: string, options?: {
        type?: 'accounts' | 'hashtags' | 'statuses';
        limit?: number;
        max_id?: string;
        min_id?: string;
        resolve?: boolean;
        offset?: number;
        following?: boolean;
        account_id?: string;
        exclude_unreviewed?: boolean;
    }): Promise<Response<Entity.Results>>;
    getInstance(): Promise<Response<Entity.Instance>>;
    getInstancePeers(): Promise<Response<Array<string>>>;
    getInstanceActivity(): Promise<Response<Array<Entity.Activity>>>;
    getInstanceTrends(limit?: number | null): Promise<Response<Array<Entity.Tag>>>;
    getInstanceDirectory(options?: {
        limit?: number;
        offset?: number;
        order?: 'active' | 'new';
        local?: boolean;
    }): Promise<Response<Array<Entity.Account>>>;
    getInstanceCustomEmojis(): Promise<Response<Array<Entity.Emoji>>>;
    getInstanceAnnouncements(): Promise<Response<Array<Entity.Announcement>>>;
    dismissInstanceAnnouncement(_id: string): Promise<Response<Record<never, never>>>;
    addReactionToAnnouncement(_id: string, _name: string): Promise<Response<Record<never, never>>>;
    removeReactionFromAnnouncement(_id: string, _name: string): Promise<Response<Record<never, never>>>;
    createEmojiReaction(_id: string, _emoji: string): Promise<Response<Entity.Status>>;
    deleteEmojiReaction(_id: string, _emoji: string): Promise<Response<Entity.Status>>;
    getEmojiReactions(_id: string): Promise<Response<Array<Entity.Reaction>>>;
    getEmojiReaction(_id: string, _emoji: string): Promise<Response<Entity.Reaction>>;
    streamingURL(): Promise<string>;
    userStreaming(): Promise<WebSocket>;
    publicStreaming(): Promise<WebSocket>;
    localStreaming(): Promise<WebSocket>;
    tagStreaming(tag: string): Promise<WebSocket>;
    listStreaming(list_id: string): Promise<WebSocket>;
    directStreaming(): Promise<WebSocket>;
}
