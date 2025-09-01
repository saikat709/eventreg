import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
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

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  const users = await readUsers();
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { password, ...userWithoutPassword } = user;

  res.json(userWithoutPassword);
};

import { Registration } from '../models/registration.model';

async function readRegistrations(): Promise<Registration[]> {
  try {
    const data = await fs.readFile(path.join(dbPath, 'registrations.json'), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  const { segmentId } = req.query;
  let users = await readUsers();

  if (segmentId) {
    const registrations = await readRegistrations();
    const userIdsInSegment = registrations
      .filter(reg => reg.segmentId === segmentId)
      .map(reg => reg.userId);
    users = users.filter(user => userIdsInSegment.includes(user.id));
  }

  const usersWithoutPasswords = users.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });

  res.json(usersWithoutPasswords);
};
