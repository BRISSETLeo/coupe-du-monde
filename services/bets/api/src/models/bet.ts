import {IModelBase} from "./modelBase";

export interface Bet extends IModelBase {
    user_id: number;
    match_id: number;
    cote: number;
    bet_amount: number;
    status: string;
}