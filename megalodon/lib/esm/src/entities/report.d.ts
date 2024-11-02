import { Account } from './account';
export type Report = {
    id: string;
    action_taken: boolean;
    action_taken_at: string | null;
    status_ids: Array<string> | null;
    rule_ids: Array<string> | null;
    category: Category | null;
    comment: string | null;
    forwarded: boolean | null;
    target_account?: Account | null;
};
export type Category = 'spam' | 'violation' | 'other';
