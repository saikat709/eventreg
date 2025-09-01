import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Segment } from '../models/segment.model';
import fs from 'fs/promises';
import path from 'path';

const dbPath = path.resolve(__dirname, '../db');

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

async function writeSegments(segments: Segment[]): Promise<void> {
  await fs.writeFile(path.join(dbPath, 'segments.json'), JSON.stringify(segments, null, 2));
}

export const createSegment = async (req: Request, res: Response) => {
  const { name, description, singleVisit } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const segments = await readSegments();

  const newSegment: Segment = {
    id: uuidv4(),
    name,
    description,
    singleVisit: singleVisit || false,
  };

  segments.push(newSegment);
  await writeSegments(segments);

  res.status(201).json(newSegment);
};

export const getSegments = async (req: Request, res: Response) => {
  const segments = await readSegments();
  res.json(segments);
};

export const updateSegment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, singleVisit } = req.body;

  const segments = await readSegments();
  const segmentIndex = segments.findIndex(segment => segment.id === id);

  if (segmentIndex === -1) {
    return res.status(404).json({ message: 'Segment not found' });
  }

  segments[segmentIndex] = {
    ...segments[segmentIndex],
    name: name || segments[segmentIndex].name,
    description: description || segments[segmentIndex].description,
    singleVisit: singleVisit !== undefined ? singleVisit : segments[segmentIndex].singleVisit,
  };

  await writeSegments(segments);

  res.json(segments[segmentIndex]);
};

export const deleteSegment = async (req: Request, res: Response) => {
  const { id } = req.params;

  const segments = await readSegments();
  const filteredSegments = segments.filter(segment => segment.id !== id);

  if (segments.length === filteredSegments.length) {
    return res.status(404).json({ message: 'Segment not found' });
  }

  await writeSegments(filteredSegments);

  res.status(204).send();
};
