import  {Router} from "express";
import { login, signupEmployer } from "../controller/auth";


const router = Router();

router.post("/login", login);

// router.post("/signup/jobseeker", signupJobseeker);
router.post("/signup/employer", signupEmployer);


export default router; 