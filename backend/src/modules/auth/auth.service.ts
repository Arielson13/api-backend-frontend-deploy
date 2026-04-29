import { db } from "../../config/db";
import bcrypt from "bcrypt";

export const createUser = async (email: string, password: string) => {
    const hash = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
        "INSERT INTO users (email, password) VALUES (?, ?)",
        [email, hash]
    )

    return result;
};

export const findUserByEmail = async (email: string) => {
    const [rows]: any = await db.execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    return rows[0];
};