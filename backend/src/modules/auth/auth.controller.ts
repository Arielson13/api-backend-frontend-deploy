import { Request, Response } from "express";
import { createUser, findUserByEmail } from "./auth.service";
import bcrypt from "bcrypt";
import { generateToken } from "../../shared/utils/jwt";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userExists = await findUserByEmail(email);
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  await createUser(email, password);

  return res.status(201).json({ message: "User created" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user.id);

  return res.json({ token });
};