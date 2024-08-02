import express from "express";
import { getallEmployers, getEmployerById, getEmployerDetails, getEmployerImage, updateEmployer, } from "../controller/employer";
import { authenticate, authorize } from "../middleware/auth";

const router = express();

router.get('/detail',authenticate,authorize('admin','employer') ,getEmployerDetails);
router.get('/image',authenticate,authorize('admin','employer'), getEmployerImage);
router.put('/updateprofile',authenticate, authorize('admin','employer'), updateEmployer);
// router.get('/',authenticate,getEmployerById);
router.get('/getall',authenticate,authorize('admin'),getallEmployers);
// router.delete('/:id',deleteUser);

export default router;