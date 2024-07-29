import { Router } from 'express';
import { createJoblisting, deleteJoblistingById, getJoblistingByFilter, getJoblistingById, getJoblistings, updateJoblisting } from '../controller/joblisting';
import { authenticate } from '../middleware/auth';

const router = Router();

// router.get('/', authenticate, getJoblistings);
router.get('/', getJoblistings);
router.get('/job',getJoblistingByFilter);
router.get('/:id',getJoblistingById);
router.post('/',authenticate,createJoblisting);
router.put('/:id',authenticate,updateJoblisting);

router.delete('/',authenticate,deleteJoblistingById);

export default router;