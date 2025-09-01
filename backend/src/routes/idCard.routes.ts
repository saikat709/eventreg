import { Router } from 'express';
import { generateIdCard } from '../controllers/idCard.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.get('/download', protect, generateIdCard);

export default router;
