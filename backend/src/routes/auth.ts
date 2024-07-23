import  {Router} from "express";
import { login, signupEmployer, signupJobseeker } from "../controller/auth";
import { createEmployerBodySchema } from "../schema/employer";
import { validateReqBody } from "../middleware/validator";
import { createJobseekerBodySchema } from "../schema/jobseeker";



const router = Router();

router.post("/login", login);
// router.post("/signup/jobseeker",  signupJobseeker);
// router.post("/signup/employer",  signupEmployer);

router.post("/signup/jobseeker", validateReqBody(createJobseekerBodySchema), signupJobseeker);
router.post("/signup/employer", validateReqBody(createEmployerBodySchema), signupEmployer);


export default router; 