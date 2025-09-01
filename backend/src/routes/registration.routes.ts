import { Router } from 'express';
import {
  createRegistration,
  getRegistrations,
  updateRegistration,
} from '../controllers/registration.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.use(protect);

router.route('/').get(getRegistrations).post(createRegistration);
router.route('/attendance').post(updateAttendance);

export default router;
