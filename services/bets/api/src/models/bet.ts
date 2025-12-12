import {IModelBase} from "./modelBase";

export interface Bet extends IModelBase {
    user_id: number;
    match_id: number;
    team_id: number;
    bet_type: string;
    cote: number;
    bet_amount: number;
    status: string;
}