import { Router } from 'express';
import { createJoblisting, deleteJoblistingById, getJoblistingByFilter, getJoblistingById, getJoblistingByUserId, getJoblistings, totalactiveJobByEmployer, totaljobpostByUser, updateJoblisting } from '../controller/joblisting';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/',getJoblistings);
router.get('/myposts',authenticate,authorize('admin','employer'),getJoblistingByUserId);
router.get('/job',getJoblistingByFilter);
router.get('/totalJobposted',authenticate,authorize('admin','employer'), totaljobpostByUser);
router.get('/totalActiveJob',authenticate,authorize('admin','employer'), totalactiveJobByEmployer);
router.get('/:id',getJoblistingById);
router.post('/',authenticate,authorize('admin','employer'),createJoblisting);
router.put('/:id',authenticate,authorize('admin','employer'),updateJoblisting);
router.delete('/',authenticate,authorize('admin','employer'),deleteJoblistingById);


export default router;