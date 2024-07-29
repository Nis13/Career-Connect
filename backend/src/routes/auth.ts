import  {Router} from "express";
import { login, signupEmployer, signupJobseeker } from "../controller/auth";
import { createEmployerBodySchema } from "../schema/employer";
import { validateReqBody } from "../middleware/validator";
import { createJobseekerBodySchema } from "../schema/jobseeker";
import { upload } from "../middleware/multer";



const router = Router();

router.post("/login", login);
// router.post("/signup/jobseeker",  signupJobseeker);
// router.post("/signup/employer", upload.single('companyLogo'), signupEmployer);

router.post("/signup/jobseeker", validateReqBody(createJobseekerBodySchema), signupJobseeker);
router.post("/signup/employer",upload.single('companyLogo'), validateReqBody(createEmployerBodySchema), signupEmployer);


export default router; 