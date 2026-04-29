import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const connectionOptions = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};

export let db: mysql.Pool;

export const initDatabase = async () => {
    const databaseName = process.env.DB_NAME;
    if (!databaseName) {
        throw new Error("DB_NAME is not defined in environment variables");
    }

    const adminPool = mysql.createPool(connectionOptions);

    try {
        await adminPool.execute(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(
            `Unable to connect to MySQL at ${connectionOptions.host}:${connectionOptions.port}. ` +
            `Verifique se o servidor MySQL está em execução e se as credenciais em .env estão corretas. Detalhes: ${message}`
        );
    } finally {
        await adminPool.end();
    }

    db = mysql.createPool({
        ...connectionOptions,
        database: databaseName,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });

    await db.execute(`
        CREATE TABLE IF NOT EXISTS users (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
};