import  {Router} from "express";
import { login, signupEmployer, signupJobseeker } from "../controller/auth";
import { createEmployerBodySchema } from "../schema/employer";
import { validateReqBody } from "../middleware/validator";



const router = Router();

router.post("/login", login);

router.post("/signup/jobseeker", signupJobseeker);
router.post("/signup/employer", validateReqBody(createEmployerBodySchema), signupEmployer);


export default router; 