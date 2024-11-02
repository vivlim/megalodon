export function toAppData(appData) {
    var _a;
    return {
        id: appData.id,
        name: appData.name,
        website: null,
        redirect_uri: appData.callbackUrl,
        client_id: '',
        client_secret: (_a = appData.secret) !== null && _a !== void 0 ? _a : '',
        url: null,
        session_token: null
    };
}
export function toTokenData(tokenData) {
    return {
        access_token: tokenData.accessToken,
        token_type: 'Firefish',
        scope: null,
        created_at: null,
        expires_in: null,
        refresh_token: null
    };
}
