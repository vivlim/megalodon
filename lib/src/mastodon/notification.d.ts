import MastodonEntity from './entity';
declare namespace MastodonNotificationType {
    const Mention: MastodonEntity.NotificationType;
    const Reblog: MastodonEntity.NotificationType;
    const Favourite: MastodonEntity.NotificationType;
    const Follow: MastodonEntity.NotificationType;
    const Poll: MastodonEntity.NotificationType;
    const FollowRequest: MastodonEntity.NotificationType;
    const Status: MastodonEntity.NotificationType;
    const Update: MastodonEntity.NotificationType;
    const AdminSignup: MastodonEntity.NotificationType;
    const AdminReport: MastodonEntity.NotificationType;
}
export default MastodonNotificationType;
