import { Request, Response } from 'express';
import { Registration } from '../models/registration.model';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import fs from 'fs/promises';
import path from 'path';

const dbPath = path.resolve(__dirname, '../db');

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

async function writeRegistrations(registrations: Registration[]): Promise<void> {
  await fs.writeFile(path.join(dbPath, 'registrations.json'), JSON.stringify(registrations, null, 2));
}

export const createRegistration = async (req: AuthenticatedRequest, res: Response) => {
  const { segmentId } = req.body;
  const userId = req.user?.id;

  if (!segmentId || !userId) {
    return res.status(400).json({ message: 'Segment ID and user ID are required' });
  }

  const registrations = await readRegistrations();

  const existingRegistration = registrations.find(
    registration => registration.userId === userId && registration.segmentId === segmentId
  );

  if (existingRegistration) {
    return res.status(400).json({ message: 'User is already registered for this segment' });
  }

  const newRegistration: Registration = {
    userId,
    segmentId,
    attended: false,
  };

  registrations.push(newRegistration);
  await writeRegistrations(registrations);

  res.status(201).json(newRegistration);
};

export const getRegistrations = async (req: Request, res: Response) => {
  const { segmentId } = req.query;
  let registrations = await readRegistrations();

  if (segmentId) {
    registrations = registrations.filter(reg => reg.segmentId === segmentId);
  }

  res.json(registrations);
};

import { Segment } from '../models/segment.model';

async function readSegments(): Promise<Segment[]> {
  try {
    const data = await fs.readFile(path.join(dbPath, 'segments.json'), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

export const updateAttendance = async (req: Request, res: Response) => {
  const { userId, segmentId } = req.body;

  if (!userId || !segmentId) {
    return res.status(400).json({ message: 'User ID and Segment ID are required' });
  }

  const registrations = await readRegistrations();
  const registration = registrations.find(
    reg => reg.userId === userId && reg.segmentId === segmentId
  );

  if (!registration) {
    return res.status(404).json({ message: 'User is not registered for this segment' });
  }

  const segments = await readSegments();
  const segment = segments.find(seg => seg.id === segmentId);

  if (!segment) {
    return res.status(404).json({ message: 'Segment not found' });
  }

  if (segment.singleVisit && registration.attended) {
    return res.status(400).json({ message: 'User has already attended this single-visit segment' });
  }

  registration.attended = true;
  await writeRegistrations(registrations);

  res.json({ message: 'Attendance updated successfully' });
};
