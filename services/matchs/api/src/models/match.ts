import { IModelBase } from "./modelBase";

export interface Match extends IModelBase {
    team1_id: number;
    team2_id: number;
    score1?: number;
    score2?: number;
    match_date: Date;
    status?: 'scheduled' | 'in_progress' | 'finished' | 'cancelled';
    stadium?: string;
    created_at?: Date;
    updated_at?: Date;
}