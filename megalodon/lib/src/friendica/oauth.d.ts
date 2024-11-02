import OAuth from '@/oauth';
export type AppDataFromServer = {
    id: string;
    name: string;
    website: string | null;
    redirect_uri: string;
    client_id: string;
    client_secret: string;
};
export type TokenDataFromServer = {
    access_token: string;
    token_type: string;
    scope: string;
    created_at: number;
};
export declare function toAppData(appData: AppDataFromServer): OAuth.AppData;
export declare function toTokenData(tokenData: TokenDataFromServer): OAuth.TokenData;
