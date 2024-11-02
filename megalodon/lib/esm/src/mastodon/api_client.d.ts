import Streaming from './web_socket';
import Response from '../response';
import MastodonEntity from './entity';
import MegalodonEntity from '../entity';
import { UnknownNotificationTypeError } from '../notification';
declare namespace MastodonAPI {
    interface Interface {
        get<T = any>(path: string, params?: any, headers?: {
            [key: string]: string;
        }, pathIsFullyQualified?: boolean): Promise<Response<T>>;
        put<T = any>(path: string, params?: any, headers?: {
            [key: string]: string;
        }): Promise<Response<T>>;
        putForm<T = any>(path: string, params?: any, headers?: {
            [key: string]: string;
        }): Promise<Response<T>>;
        patch<T = any>(path: string, params?: any, headers?: {
            [key: string]: string;
        }): Promise<Response<T>>;
        patchForm<T = any>(path: string, params?: any, headers?: {
            [key: string]: string;
        }): Promise<Response<T>>;
        post<T = any>(path: string, params?: any, headers?: {
            [key: string]: string;
        }): Promise<Response<T>>;
        postForm<T = any>(path: string, params?: any, headers?: {
            [key: string]: string;
        }): Promise<Response<T>>;
        del<T = any>(path: string, params?: any, headers?: {
            [key: string]: string;
        }): Promise<Response<T>>;
        cancel(): void;
        socket(url: string, stream: string, params?: string): Streaming;
    }
    class Client implements Interface {
        static DEFAULT_SCOPE: string[];
        static DEFAULT_URL: string;
        static NO_REDIRECT: string;
        private accessToken;
        private baseUrl;
        private userAgent;
        private abortController;
        constructor(baseUrl: string, accessToken?: string | null, userAgent?: string);
        get<T>(path: string, params?: {}, headers?: {
            [key: string]: string;
        }, pathIsFullyQualified?: boolean): Promise<Response<T>>;
        put<T>(path: string, params?: {}, headers?: {
            [key: string]: string;
        }): Promise<Response<T>>;
        putForm<T>(path: string, params?: {}, headers?: {
            [key: string]: string;
        }): Promise<Response<T>>;
        patch<T>(path: string, params?: {}, headers?: {
            [key: string]: string;
        }): Promise<Response<T>>;
        patchForm<T>(path: string, params?: {}, headers?: {
            [key: string]: string;
        }): Promise<Response<T>>;
        post<T>(path: string, params?: {}, headers?: {
            [key: string]: string;
        }): Promise<Response<T>>;
        postForm<T>(path: string, params?: {}, headers?: {
            [key: string]: string;
        }): Promise<Response<T>>;
        del<T>(path: string, params?: {}, headers?: {
            [key: string]: string;
        }): Promise<Response<T>>;
        cancel(): void;
        socket(url: string, stream: string, params?: string): Streaming;
    }
    namespace Entity {
        type Account = MastodonEntity.Account;
        type Activity = MastodonEntity.Activity;
        type Announcement = MastodonEntity.Announcement;
        type Application = MastodonEntity.Application;
        type AsyncAttachment = MegalodonEntity.AsyncAttachment;
        type Attachment = MastodonEntity.Attachment;
        type Card = MastodonEntity.Card;
        type Context = MastodonEntity.Context;
        type Conversation = MastodonEntity.Conversation;
        type Emoji = MastodonEntity.Emoji;
        type FeaturedTag = MastodonEntity.FeaturedTag;
        type Field = MastodonEntity.Field;
        type Filter = MastodonEntity.Filter;
        type History = MastodonEntity.History;
        type IdentityProof = MastodonEntity.IdentityProof;
        type Instance = MastodonEntity.Instance;
        type List = MastodonEntity.List;
        type Marker = MastodonEntity.Marker;
        type Mention = MastodonEntity.Mention;
        type Notification = MastodonEntity.Notification;
        type Poll = MastodonEntity.Poll;
        type PollOption = MastodonEntity.PollOption;
        type Preferences = MastodonEntity.Preferences;
        type PushSubscription = MastodonEntity.PushSubscription;
        type Relationship = MastodonEntity.Relationship;
        type Report = MastodonEntity.Report;
        type Results = MastodonEntity.Results;
        type Role = MastodonEntity.Role;
        type ScheduledStatus = MastodonEntity.ScheduledStatus;
        type Source = MastodonEntity.Source;
        type Stats = MastodonEntity.Stats;
        type Status = MastodonEntity.Status;
        type StatusParams = MastodonEntity.StatusParams;
        type StatusSource = MastodonEntity.StatusSource;
        type Tag = MastodonEntity.Tag;
        type Token = MastodonEntity.Token;
        type URLs = MastodonEntity.URLs;
    }
    namespace Converter {
        const encodeNotificationType: (t: MegalodonEntity.NotificationType) => MastodonEntity.NotificationType | UnknownNotificationTypeError;
        const decodeNotificationType: (t: MastodonEntity.NotificationType) => MegalodonEntity.NotificationType | UnknownNotificationTypeError;
        const account: (a: Entity.Account) => MegalodonEntity.Account;
        const activity: (a: Entity.Activity) => MegalodonEntity.Activity;
        const announcement: (a: Entity.Announcement) => MegalodonEntity.Announcement;
        const application: (a: Entity.Application) => MegalodonEntity.Application;
        const attachment: (a: Entity.Attachment) => MegalodonEntity.Attachment;
        const async_attachment: (a: Entity.AsyncAttachment) => import("../entities/attachment").Attachment | import("../entities/async_attachment").AsyncAttachment;
        const card: (c: Entity.Card) => MegalodonEntity.Card;
        const context: (c: Entity.Context) => MegalodonEntity.Context;
        const conversation: (c: Entity.Conversation) => MegalodonEntity.Conversation;
        const emoji: (e: Entity.Emoji) => MegalodonEntity.Emoji;
        const featured_tag: (e: Entity.FeaturedTag) => MegalodonEntity.FeaturedTag;
        const field: (f: Entity.Field) => MegalodonEntity.Field;
        const filter: (f: Entity.Filter) => MegalodonEntity.Filter;
        const history: (h: Entity.History) => MegalodonEntity.History;
        const identity_proof: (i: Entity.IdentityProof) => MegalodonEntity.IdentityProof;
        const instance: (i: Entity.Instance) => MegalodonEntity.Instance;
        const list: (l: Entity.List) => MegalodonEntity.List;
        const marker: (m: Entity.Marker | Record<never, never>) => MegalodonEntity.Marker | Record<never, never>;
        const mention: (m: Entity.Mention) => MegalodonEntity.Mention;
        const notification: (n: Entity.Notification) => MegalodonEntity.Notification | UnknownNotificationTypeError;
        const poll: (p: Entity.Poll) => MegalodonEntity.Poll;
        const poll_option: (p: Entity.PollOption) => MegalodonEntity.PollOption;
        const preferences: (p: Entity.Preferences) => MegalodonEntity.Preferences;
        const push_subscription: (p: Entity.PushSubscription) => MegalodonEntity.PushSubscription;
        const relationship: (r: Entity.Relationship) => MegalodonEntity.Relationship;
        const report: (r: Entity.Report) => MegalodonEntity.Report;
        const results: (r: Entity.Results) => MegalodonEntity.Results;
        const scheduled_status: (s: Entity.ScheduledStatus) => MegalodonEntity.ScheduledStatus;
        const source: (s: Entity.Source) => MegalodonEntity.Source;
        const stats: (s: Entity.Stats) => MegalodonEntity.Stats;
        const status: (s: Entity.Status) => MegalodonEntity.Status;
        const status_params: (s: Entity.StatusParams) => MegalodonEntity.StatusParams;
        const status_source: (s: Entity.StatusSource) => MegalodonEntity.StatusSource;
        const tag: (t: Entity.Tag) => MegalodonEntity.Tag;
        const token: (t: Entity.Token) => MegalodonEntity.Token;
        const urls: (u: Entity.URLs) => MegalodonEntity.URLs;
    }
}
export default MastodonAPI;
