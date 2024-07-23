import { EmployerModel } from './../model/employer';
import bcrypt from 'bcrypt';
import { Employer, Jobseeker, User } from "../interface/users";
import { sign } from 'jsonwebtoken';
import config from '../config';
import { JobseekerModel } from '../model/jobseeker';

export async function signupEmployer(employer:Employer){
  const existingUser = await EmployerModel.getUserByEmail(employer.email);

  if (existingUser) {
    const message = "User already exists";
    return {message:message};
  }

  const password = await bcrypt.hash(employer.password, 10);
  employer.password = password;

  return EmployerModel.signup(employer);
}

export async function signupJobseeker(jobseeker:Jobseeker){
  const existingUser = await JobseekerModel.getUserByEmail(jobseeker.email);

  if (existingUser) {
    const message = "User already exists";
    return {message:message};
  }

  const password = await bcrypt.hash(jobseeker.password, 10);
  jobseeker.password = password;

  return await JobseekerModel.signup(jobseeker);
}

export async function login(body: Pick<User, "email" | "password">) {
    const existingUser =  await EmployerModel.getUserByEmail(body.email);
  
    if (!existingUser) {
      return "Invalid Email";
    }
  
    const isValidPassword = await bcrypt.compare(
      body.password,
      existingUser.password
    );
  
    if (!isValidPassword) {
      return "Invalid Password";
    }
    
    const payload = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      role:existingUser.role
    };
  
    const accessToken = await sign(payload, config.jwt.secret!, {
      expiresIn: config.jwt.accessTokenExpiryMS,
    });
  
    const refreshToken = await sign(payload, config.jwt.secret!, {
      expiresIn: config.jwt.refreshTokenExpityMS,
    });
    return {  message:"user logged in successfully",role:existingUser.role,accessToken, refreshToken };
  }


 