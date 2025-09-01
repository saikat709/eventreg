import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import fs from 'fs/promises';
import path from 'path';

const dbPath = path.resolve(__dirname, '../db');

async function readUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(path.join(dbPath, 'users.json'), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function writeUsers(users: User[]): Promise<void> {
  await fs.writeFile(path.join(dbPath, 'users.json'), JSON.stringify(users, null, 2));
}

export const register = async (req: Request, res: Response) => {
  const { name, phone, address, age, institution, tShirtSize, password } = req.body;

  if (!name || !phone || !password) {
    return res.status(400).json({ message: 'Name, phone, and password are required' });
  }

  const users = await readUsers();
  const existingUser = users.find(user => user.phone === phone);

  if (existingUser) {
    return res.status(400).json({ message: 'User with this phone number already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: uuidv4(),
    name,
    phone,
    address,
    age,
    institution,
    tShirtSize,
    password: hashedPassword,
  };

  users.push(newUser);
  await writeUsers(users);

  res.status(201).json({ message: 'User registered successfully' });
};

export const login = async (req: Request, res: Response) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ message: 'Phone and password are required' });
  }

  const users = await readUsers();
  const user = users.find(user => user.phone === phone);

  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password!);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const accessToken = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
  const refreshToken = jwt.sign({ id: user.id }, 'your_refresh_token_secret', { expiresIn: '7d' });

  res.json({ accessToken, refreshToken });
};
