import axios from 'axios';
import { UserCredentials } from '../../interfaces/Users';
import { BASE_URL } from '../../constants/urls';

export const login = async (credentials: UserCredentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const signupemployer = async (data: FormData) => {
    try {
        console.log(data);
        const response = await axios.post(`${BASE_URL}/auth/signup/employer`, data);
        return response; 
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Signup error:', error.response?.data || error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        throw new Error('Signup failed');
    }
};

export const signupjobseeker = async (data: FormData) => {
  try {
      console.log(data);
      const response = await axios.post(`${BASE_URL}/auth/signup/jobseeker`, data);
      return response; 
  } catch (error) {
      if (axios.isAxiosError(error)) {
          console.error('Signup error:', error.response?.data || error.message);
      } else {
          console.error('Unexpected error:', error);
      }
      throw new Error('Signup failed');
  }
};
