import { Router } from 'express';
import { createJoblisting, deleteJoblistingById, getJoblistingById, getJoblistings } from '../controller/joblisting';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, getJoblistings);
router.get('/:id',authenticate,getJoblistingById);
router.post('/',authenticate,createJoblisting);
router.delete('/',authenticate,deleteJoblistingById)

export default router;