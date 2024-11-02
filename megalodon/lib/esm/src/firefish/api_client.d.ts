import Response from '../response';
import FirefishEntity from './entity';
import MegalodonEntity from '../entity';
import WebSocket from './web_socket';
import { UnknownNotificationTypeError } from '../notification';
declare namespace FirefishAPI {
    namespace Entity {
        type Announcement = FirefishEntity.Announcement;
        type App = FirefishEntity.App;
        type Blocking = FirefishEntity.Blocking;
        type Choice = FirefishEntity.Choice;
        type CreatedNote = FirefishEntity.CreatedNote;
        type Emoji = FirefishEntity.Emoji;
        type Favorite = FirefishEntity.Favorite;
        type File = FirefishEntity.File;
        type Follow = FirefishEntity.Follow;
        type FollowRequest = FirefishEntity.FollowRequest;
        type Hashtag = FirefishEntity.Hashtag;
        type List = FirefishEntity.List;
        type Meta = FirefishEntity.Meta;
        type Mute = FirefishEntity.Mute;
        type Note = FirefishEntity.Note;
        type NoteVisibility = FirefishEntity.NoteVisibility;
        type Notification = FirefishEntity.Notification;
        type Poll = FirefishEntity.Poll;
        type Reaction = FirefishEntity.Reaction;
        type Relation = FirefishEntity.Relation;
        type User = FirefishEntity.User;
        type UserDetail = FirefishEntity.UserDetail;
        type UserDetailMe = FirefishEntity.UserDetailMe;
        type Session = FirefishEntity.Session;
        type Stats = FirefishEntity.Stats;
        type Instance = FirefishEntity.Instance;
        type AccountEmoji = FirefishEntity.AccountEmoji;
        type Field = FirefishEntity.Field;
    }
    namespace Converter {
        const announcement: (a: Entity.Announcement) => MegalodonEntity.Announcement;
        const emoji: (e: Entity.Emoji) => MegalodonEntity.Emoji;
        const user: (u: Entity.User) => MegalodonEntity.Account;
        const userDetail: (u: Entity.UserDetail) => MegalodonEntity.Account;
        const userDetailMe: (u: Entity.UserDetailMe) => MegalodonEntity.Account;
        const userPreferences: (u: FirefishAPI.Entity.UserDetailMe, v: MegalodonEntity.StatusVisibility) => MegalodonEntity.Preferences;
        const visibility: (v: FirefishAPI.Entity.NoteVisibility) => MegalodonEntity.StatusVisibility;
        const encodeVisibility: (v: MegalodonEntity.StatusVisibility) => FirefishAPI.Entity.NoteVisibility;
        const fileType: (s: string) => 'unknown' | 'image' | 'gifv' | 'video' | 'audio';
        const file: (f: Entity.File) => MegalodonEntity.Attachment;
        const follower: (f: Entity.Follow) => MegalodonEntity.Account;
        const following: (f: Entity.Follow) => MegalodonEntity.Account;
        const relation: (r: Entity.Relation) => MegalodonEntity.Relationship;
        const choice: (c: Entity.Choice) => MegalodonEntity.PollOption;
        const poll: (p: Entity.Poll) => MegalodonEntity.Poll;
        const note: (n: Entity.Note) => MegalodonEntity.Status;
        const mapReactions: (emojis: Array<FirefishEntity.Emoji>, r: {
            [key: string]: number;
        }, myReaction?: string | null) => Array<MegalodonEntity.Reaction>;
        const reactions: (r: Array<Entity.Reaction>) => Array<MegalodonEntity.Reaction>;
        const noteToConversation: (n: Entity.Note) => MegalodonEntity.Conversation;
        const list: (l: Entity.List) => MegalodonEntity.List;
        const encodeNotificationType: (e: MegalodonEntity.NotificationType) => FirefishEntity.NotificationType | UnknownNotificationTypeError;
        const decodeNotificationType: (e: FirefishEntity.NotificationType) => MegalodonEntity.NotificationType | UnknownNotificationTypeError;
        const notification: (n: Entity.Notification) => MegalodonEntity.Notification | UnknownNotificationTypeError;
        const stats: (s: Entity.Stats) => MegalodonEntity.Stats;
        const meta: (m: Entity.Meta, s: Entity.Stats) => MegalodonEntity.Instance;
        const instance: (i: Entity.Instance) => MegalodonEntity.Instance;
        const hashtag: (h: Entity.Hashtag) => MegalodonEntity.Tag;
    }
    const DEFAULT_SCOPE: string[];
    interface Interface {
        get<T = any>(path: string, params?: any, headers?: {
            [key: string]: string;
        }): Promise<Response<T>>;
        post<T = any>(path: string, params?: any, headers?: {
            [key: string]: string;
        }): Promise<Response<T>>;
        cancel(): void;
        socket(url: string, channel: 'user' | 'localTimeline' | 'hybridTimeline' | 'globalTimeline' | 'conversation' | 'list', listId?: string): WebSocket;
    }
    class Client implements Interface {
        private accessToken;
        private baseUrl;
        private userAgent;
        private abortController;
        constructor(baseUrl: string, accessToken: string | null, userAgent?: string);
        get<T>(path: string, params?: any, headers?: {
            [key: string]: string;
        }): Promise<Response<T>>;
        post<T>(path: string, params?: any, headers?: {
            [key: string]: string;
        }): Promise<Response<T>>;
        cancel(): void;
        socket(url: string, channel: 'user' | 'localTimeline' | 'hybridTimeline' | 'globalTimeline' | 'conversation' | 'list', listId?: string): WebSocket;
    }
}
export default FirefishAPI;
