import express from "express";
import { createApplication, getallApplications, getApplicationById, getApplicationByJobId, getApplicationByJobseekerId, getApplicationByUserId, totalApplicationByEmployer, totalJobApplied, totalJobRejected, updateApplicationStatus } from "../controller/application";
import { authenticate, authorize } from "../middleware/auth";
import { uploadPDF } from "../middleware/pdfmulter";

const router = express();
router.get('/getall',authenticate,authorize('admin'),getallApplications);
router.get('/getbyemployer', authenticate,authorize('admin','employer'), getApplicationByUserId);
router.get('/totalApplication', authenticate,authorize('admin','employer'), totalApplicationByEmployer);
router.get('/getbyjobseeker', authenticate,authorize('admin','jobseeker'), getApplicationByJobseekerId);
router.get('/totalJobApplied', authenticate,authorize('admin','jobseeker'), totalJobApplied);
router.get('/totalJobRejected', authenticate,authorize('admin','jobseeker'), totalJobRejected);

router.post('/:job_id', uploadPDF.single('resume'),authenticate,authorize('admin','jobseeker'),createApplication);


router.get('/byjob/:job_id',authenticate,authorize('admin','employer','jobseeker'),getApplicationByJobId);
router.get('/get/:application_id', authenticate,authorize('admin','employer','jobseeker'), getApplicationById);

router.put('/:application_id',authenticate,authorize('admin','employer'), updateApplicationStatus);

export default router;