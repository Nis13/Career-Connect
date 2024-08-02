import  {Router} from "express";
import { login, signupEmployer, signupJobseeker } from "../controller/auth";
import { createEmployerBodySchema } from "../schema/employer";
import { validateReqBody } from "../middleware/validator";
import { createJobseekerBodySchema } from "../schema/jobseeker";
import { upload } from "../middleware/multer";
import { uploadPDF } from "../middleware/pdfmulter";

const router = Router();

router.post("/login", login);
router.post("/signup/jobseeker",  uploadPDF.single('resume'),validateReqBody(createJobseekerBodySchema), signupJobseeker);
router.post("/signup/employer",upload.single('companyLogo'), validateReqBody(createEmployerBodySchema), signupEmployer);


export default router; 