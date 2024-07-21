import { Router } from 'express';
import { getJobs} from '../controller/job';

const router = Router();

router.get('/jobs', getJobs);

export default router;
