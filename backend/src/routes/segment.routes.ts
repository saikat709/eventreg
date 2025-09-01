import { Router } from 'express';
import { createSegment, getSegments, updateSegment, deleteSegment } from '../controllers/segment.controller';

const router = Router();

router.get('/', getSegments);
import { protect } from '../middleware/auth.middleware';

router.post('/', protect, createSegment);
router.put('/:id', protect, updateSegment);
router.delete('/:id', protect, deleteSegment);

export default router;
