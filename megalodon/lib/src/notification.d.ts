import Entity from './entity';
declare namespace NotificationType {
    const Follow: Entity.NotificationType;
    const Favourite: Entity.NotificationType;
    const Reblog: Entity.NotificationType;
    const Mention: Entity.NotificationType;
    const Reaction: Entity.NotificationType;
    const FollowRequest: Entity.NotificationType;
    const Status: Entity.NotificationType;
    const PollVote: Entity.NotificationType;
    const PollExpired: Entity.NotificationType;
    const Update: Entity.NotificationType;
    const Move: Entity.NotificationType;
    const AdminSignup: Entity.NotificationType;
    const AdminReport: Entity.NotificationType;
}
export declare class UnknownNotificationTypeError extends Error {
    constructor();
}
export default NotificationType;
