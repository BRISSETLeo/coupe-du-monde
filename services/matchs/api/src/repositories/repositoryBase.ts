import {IModelBase} from "../models/modelBase";
import * as mysql from "mysql2/promise";
import Database from "../config/database";
import {ResultSetHeader} from "mysql2/promise";

export abstract class RepositoryBase <T extends IModelBase> {

    protected db: mysql.Connection | null = null;
    protected readonly table: string;

    protected constructor(tableName: string){
        // get mysql instance
        Database.getMysqlInstance()
            .then((res) => {
            this.db = res;
        })
        this.table = tableName;
    }

    public async create(data: Partial<T>): Promise<T> {
        if (!this.db) throw new Error('db cannot be null');
        try {
            const keys = Object.keys(data).join(', ');
            const values = Object.values(data);
            const placeholders = values.map(() => '?').join(', ');

            const [result] = await this.db.execute<ResultSetHeader>(
                `INSERT INTO ${this.table} (${keys}) VALUES (${placeholders})`,
                values
            );

            return { ...data, id: result.insertId } as T;
        } catch (e) {
            throw e;
        }
    }

    public async getList(): Promise<T[]>{
        if (!this.db) throw new Error('db cannot be null')
        try {
            const [results, fields] = await this.db.query(`SELECT * FROM ${this.table};`)
            return results as unknown as T[];
        } catch (e){
            throw e;
        }
    }

    public async getOne(id: number): Promise<T | null>{
        if (!this.db) throw new Error('db cannot be null')
        try {
            const [results, fields] = await this.db.query(`SELECT * FROM ${this.table} WHERE id=${id};`)
            if (Array.isArray(results) && results.length == 1) return results[0] as T;
            return null;
        } catch (e){
            throw e;
        }
    }

    public async update(id: number, data: Partial<T>): Promise<T | null> {
        if (!this.db) throw new Error('db cannot be null');
        try {
            const keys = Object.keys(data);
            const values = Object.values(data);

            const setClause = keys.map(key => `${key} = ?`).join(', ');

            const queryValues = [...values, id];

            const [result] = await this.db.execute<ResultSetHeader>(
                `UPDATE ${this.table} SET ${setClause} WHERE id = ?`,
                queryValues
            );

            if (result.affectedRows === 0) return null;
            return this.getOne(id);
        } catch (e) {
            throw e;
        }
    }

    public async delete(id: number): Promise<boolean> {
        if (!this.db) throw new Error('db cannot be null');
        try {
            const [result] = await this.db.execute<ResultSetHeader>(
                `DELETE FROM ${this.table} WHERE id = ?`,
                [id]
            );
            return result.affectedRows > 0;
        } catch (e) {
            throw e;
        }
    }

}
