import Streaming from './web_socket';
import Response from '../response';
import GotosocialEntity from './entity';
import MegalodonEntity from '../entity';
import { UnknownNotificationTypeError } from '../notification';
declare namespace GotosocialAPI {
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
        type Account = GotosocialEntity.Account;
        type Application = GotosocialEntity.Application;
        type AsyncAttachment = MegalodonEntity.AsyncAttachment;
        type Attachment = GotosocialEntity.Attachment;
        type Card = GotosocialEntity.Card;
        type Context = GotosocialEntity.Context;
        type Emoji = GotosocialEntity.Emoji;
        type Field = GotosocialEntity.Field;
        type Filter = GotosocialEntity.Filter;
        type Instance = GotosocialEntity.Instance;
        type List = GotosocialEntity.List;
        type Marker = GotosocialEntity.Marker;
        type Mention = GotosocialEntity.Mention;
        type Notification = GotosocialEntity.Notification;
        type Poll = GotosocialEntity.Poll;
        type PollOption = GotosocialEntity.PollOption;
        type Preferences = GotosocialEntity.Preferences;
        type Relationship = GotosocialEntity.Relationship;
        type Report = GotosocialEntity.Report;
        type Results = GotosocialEntity.Results;
        type Role = GotosocialEntity.Role;
        type ScheduledStatus = GotosocialEntity.ScheduledStatus;
        type Source = GotosocialEntity.Source;
        type Stats = GotosocialEntity.Stats;
        type Status = GotosocialEntity.Status;
        type StatusParams = GotosocialEntity.StatusParams;
        type StatusSource = GotosocialEntity.StatusSource;
        type Tag = GotosocialEntity.Tag;
        type Token = GotosocialEntity.Token;
        type URLs = GotosocialEntity.URLs;
    }
    namespace Converter {
        const encodeNotificationType: (t: MegalodonEntity.NotificationType) => GotosocialEntity.NotificationType | UnknownNotificationTypeError;
        const decodeNotificationType: (t: GotosocialEntity.NotificationType) => MegalodonEntity.NotificationType | UnknownNotificationTypeError;
        const account: (a: Entity.Account) => MegalodonEntity.Account;
        const application: (a: Entity.Application) => MegalodonEntity.Application;
        const attachment: (a: Entity.Attachment) => MegalodonEntity.Attachment;
        const async_attachment: (a: Entity.AsyncAttachment) => import("../entities/attachment").Attachment | import("../entities/async_attachment").AsyncAttachment;
        const card: (c: Entity.Card) => MegalodonEntity.Card;
        const context: (c: Entity.Context) => MegalodonEntity.Context;
        const emoji: (e: Entity.Emoji) => MegalodonEntity.Emoji;
        const field: (f: Entity.Field) => MegalodonEntity.Field;
        const instance: (i: Entity.Instance) => MegalodonEntity.Instance;
        const list: (l: Entity.List) => MegalodonEntity.List;
        const marker: (m: Entity.Marker | Record<never, never>) => MegalodonEntity.Marker | Record<never, never>;
        const mention: (m: Entity.Mention) => MegalodonEntity.Mention;
        const notification: (n: Entity.Notification) => MegalodonEntity.Notification | UnknownNotificationTypeError;
        const poll: (p: Entity.Poll) => MegalodonEntity.Poll;
        const poll_option: (p: Entity.PollOption) => MegalodonEntity.PollOption;
        const preferences: (p: Entity.Preferences) => MegalodonEntity.Preferences;
        const relationship: (r: Entity.Relationship) => MegalodonEntity.Relationship;
        const report: (r: Entity.Report) => MegalodonEntity.Report;
        const results: (r: Entity.Results) => MegalodonEntity.Results;
        const scheduled_status: (s: Entity.ScheduledStatus) => MegalodonEntity.ScheduledStatus;
        const source: (s: Entity.Source) => MegalodonEntity.Source;
        const stats: (s: Entity.Stats) => MegalodonEntity.Stats;
        const status: (s: Entity.Status) => MegalodonEntity.Status;
        const status_params: (s: Entity.StatusParams) => MegalodonEntity.StatusParams;
        const tag: (t: Entity.Tag) => MegalodonEntity.Tag;
        const token: (t: Entity.Token) => MegalodonEntity.Token;
        const urls: (u: Entity.URLs) => MegalodonEntity.URLs;
        const filter: (f: Entity.Filter) => MegalodonEntity.Filter;
        const status_source: (s: Entity.StatusSource) => MegalodonEntity.StatusSource;
    }
}
export default GotosocialAPI;
