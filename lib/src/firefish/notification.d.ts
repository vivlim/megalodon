import FirefishEntity from './entity';
declare namespace FirefishNotificationType {
    const Follow: FirefishEntity.NotificationType;
    const Mention: FirefishEntity.NotificationType;
    const Reply: FirefishEntity.NotificationType;
    const Renote: FirefishEntity.NotificationType;
    const Quote: FirefishEntity.NotificationType;
    const Reaction: FirefishEntity.NotificationType;
    const PollVote: FirefishEntity.NotificationType;
    const PollEnded: FirefishEntity.NotificationType;
    const ReceiveFollowRequest: FirefishEntity.NotificationType;
    const FollowRequestAccepted: FirefishEntity.NotificationType;
    const GroupInvited: FirefishEntity.NotificationType;
    const App: FirefishEntity.NotificationType;
}
export default FirefishNotificationType;
