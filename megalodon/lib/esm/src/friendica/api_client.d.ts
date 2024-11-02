import WebSocket from './web_socket';
import Response from '../response';
import FriendicaEntity from './entity';
import MegalodonEntity from '../entity';
import { UnknownNotificationTypeError } from '../notification';
declare namespace FriendicaAPI {
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
        socket(url: string, stream: string, params?: string): WebSocket;
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
        socket(url: string, stream: string, params?: string): WebSocket;
    }
    namespace Entity {
        type Account = FriendicaEntity.Account;
        type Activity = FriendicaEntity.Activity;
        type Application = FriendicaEntity.Application;
        type AsyncAttachment = FriendicaEntity.AsyncAttachment;
        type Attachment = FriendicaEntity.Attachment;
        type Card = FriendicaEntity.Card;
        type Context = FriendicaEntity.Context;
        type Conversation = FriendicaEntity.Conversation;
        type Emoji = FriendicaEntity.Emoji;
        type FeaturedTag = FriendicaEntity.FeaturedTag;
        type Field = FriendicaEntity.Field;
        type Filter = FriendicaEntity.Filter;
        type FollowRequest = FriendicaEntity.FollowRequest;
        type History = FriendicaEntity.History;
        type IdentityProof = FriendicaEntity.IdentityProof;
        type Instance = FriendicaEntity.Instance;
        type List = FriendicaEntity.List;
        type Marker = FriendicaEntity.Marker;
        type Mention = FriendicaEntity.Mention;
        type Notification = FriendicaEntity.Notification;
        type Poll = FriendicaEntity.Poll;
        type PollOption = FriendicaEntity.PollOption;
        type Preferences = FriendicaEntity.Preferences;
        type PushSubscription = FriendicaEntity.PushSubscription;
        type Relationship = FriendicaEntity.Relationship;
        type Report = FriendicaEntity.Report;
        type Results = FriendicaEntity.Results;
        type ScheduledStatus = FriendicaEntity.ScheduledStatus;
        type Source = FriendicaEntity.Source;
        type Stats = FriendicaEntity.Stats;
        type Status = FriendicaEntity.Status;
        type StatusVisibility = FriendicaEntity.StatusVisibility;
        type StatusParams = FriendicaEntity.StatusParams;
        type StatusSource = FriendicaEntity.StatusSource;
        type Tag = FriendicaEntity.Tag;
        type Token = FriendicaEntity.Token;
        type URLs = FriendicaEntity.URLs;
    }
    namespace Converter {
        const encodeNotificationType: (t: MegalodonEntity.NotificationType) => FriendicaEntity.NotificationType | UnknownNotificationTypeError;
        const decodeNotificationType: (t: FriendicaEntity.NotificationType) => MegalodonEntity.NotificationType | UnknownNotificationTypeError;
        const encodeVisibility: (v: MegalodonEntity.StatusVisibility) => FriendicaAPI.Entity.StatusVisibility;
        const account: (a: Entity.Account) => MegalodonEntity.Account;
        const activity: (a: Entity.Activity) => MegalodonEntity.Activity;
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
        const follow_request: (f: Entity.FollowRequest) => MegalodonEntity.FollowRequest;
        const history: (h: Entity.History) => MegalodonEntity.History;
        const identity_proof: (i: Entity.IdentityProof) => MegalodonEntity.IdentityProof;
        const instance: (i: Entity.Instance) => MegalodonEntity.Instance;
        const list: (l: Entity.List) => MegalodonEntity.List;
        const marker: (m: Entity.Marker) => MegalodonEntity.Marker;
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
export default FriendicaAPI;
