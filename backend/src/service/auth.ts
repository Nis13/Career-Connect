import { EmployerModel } from './../model/employer';
import bcrypt from 'bcrypt';
import { Employer, User } from "../interface/users";
import { sign } from 'jsonwebtoken';
import config from '../config';

export async function signup(employer:Employer){
  const existingUser = await EmployerModel.getUserByEmail(employer.email);

  if (existingUser) {
    const message = "User already exists";
    return {message:message};
  }

  const password = await bcrypt.hash(employer.password, 10);
  employer.password = password;

  return EmployerModel.signup(employer);
}

export async function login(body: Pick<User, "email" | "password">) {
    const existingUser =  await EmployerModel.getUserByEmail(body.email);
  
    if (!existingUser) {
      return {message:"Invalid Email"};
    }
  
    const isValidPassword = await bcrypt.compare(
      body.password,
      existingUser.password
    );
  
    if (!isValidPassword) {
      return {message:"Invalid Password"};
    }
    
    const payload = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      permissions: existingUser.permissions,
    };
  
    const accessToken = await sign(payload, config.jwt.secret!, {
      expiresIn: config.jwt.accessTokenExpiryMS,
    });
  
    const refreshToken = await sign(payload, config.jwt.secret!, {
      expiresIn: config.jwt.refreshTokenExpityMS,
    });
    return { accessToken, refreshToken };
  }


 