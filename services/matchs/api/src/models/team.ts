import { IModelBase } from "./modelBase";

export interface Team extends IModelBase {
    name: string;
    country: string;
    logo?: string;
    created_at?: Date;
    updated_at?: Date;
}