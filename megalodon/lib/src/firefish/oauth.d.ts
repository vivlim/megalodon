import OAuth from '@/oauth';
export type AppDataFromServer = {
    id: string;
    name: string;
    callbackUrl: string | null;
    permission: Array<string>;
    secret?: string;
    isAuthorized?: boolean;
};
export type TokenDataFromServer = {
    accessToken: string;
};
export declare function toAppData(appData: AppDataFromServer): OAuth.AppData;
export declare function toTokenData(tokenData: TokenDataFromServer): OAuth.TokenData;
