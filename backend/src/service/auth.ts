import bcrypt from 'bcrypt';
import { User } from "../interface/users";
import { sign } from 'jsonwebtoken';
import config from '../config';
import { UserModel } from '../model/users';

export async function signup(user:User){
  const existingUser = await UserModel.getUserByEmail(user.email);

  if (existingUser) {
    const message = "User already exists";
    return {message:message};
  }

  const password = await bcrypt.hash(user.password, 10);
  user.password = password;

  return UserModel.signup(user);
}

export async function login(body: Pick<User, "email" | "password">) {
    const existingUser =  await UserModel.getUserByEmail(body.email);
  
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


 