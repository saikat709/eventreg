import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { User } from '../models/user.model';
import fs from 'fs/promises';
import path from 'path';
import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';

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

export const generateIdCard = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  const users = await readUsers();
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${user.name}_ID_Card.pdf`);

  doc.pipe(res);

  doc.fontSize(25).text('Event Registration ID Card', { align: 'center' });

  doc.moveDown();
  doc.fontSize(16).text(`Name: ${user.name}`);
  doc.text(`Phone: ${user.phone}`);
  doc.text(`Address: ${user.address}`);
  doc.text(`Age: ${user.age}`);
  doc.text(`Institution: ${user.institution}`);
  doc.text(`T-Shirt Size: ${user.tShirtSize.toUpperCase()}`);

  const qrCodeDataUrl = await QRCode.toDataURL(user.id);
  const qrCodeImage = qrCodeDataUrl.split(',base64,').pop();

  if (qrCodeImage) {
    doc.moveDown();
    doc.image(Buffer.from(qrCodeImage, 'base64'), {
      fit: [150, 150],
      align: 'center',
      valign: 'center'
    });
  }

  doc.end();
};
