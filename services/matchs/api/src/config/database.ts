import * as mysql from "mysql2/promise";

export default class Database {

    private static mysqlInstance: mysql.Connection | null = null;

    public static async getMysqlInstance(): Promise<mysql.Connection> {
        if (this.mysqlInstance === null) {
            this.mysqlInstance = await mysql.createConnection({
                host: process.env.DB_HOST || '127.0.0.1',
                user: process.env.DB_USER || "pizza_napoli_user",
                password: process.env.DB_PASS || "",
                database: process.env.DB_NAME || "pizza_napoli"
            })
        }
        return this.mysqlInstance;
    }
}