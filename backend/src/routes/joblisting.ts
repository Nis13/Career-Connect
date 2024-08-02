import { Router } from 'express';
import { createJoblisting, deleteJoblistingById, getJoblistingByFilter, getJoblistingById, getJoblistingByUserId, getJoblistings, updateJoblisting } from '../controller/joblisting';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/',getJoblistings);
router.get('/myposts',authenticate,authorize('admin','employer'),getJoblistingByUserId);
router.get('/job',getJoblistingByFilter);
router.get('/:id',getJoblistingById);
router.post('/',authenticate,authorize('admin','employer'),createJoblisting);
router.put('/:id',authenticate,authorize('admin','employer'),updateJoblisting);
router.delete('/',authenticate,authorize('admin','employer'),deleteJoblistingById);

export default router;