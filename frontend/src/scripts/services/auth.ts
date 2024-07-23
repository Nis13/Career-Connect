// frontend/src/scripts/services/auth.ts

import axios from 'axios';
import { Employer, Jobseeker, UserCredentials } from '../../interfaces/Users';



const BASE_URL = 'http://localhost:8000'; // Adjust based on your backend URL

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

export const signupemployer = async (data: Employer) => {
    try {
        console.log(data);
        const response = await axios.post(`${BASE_URL}/auth/signup/employer`, data);
        return response; 
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle axios-specific errors
            console.error('Signup error:', error.response?.data || error.message);
        } else {
            // Handle general errors
            console.error('Unexpected error:', error);
        }
        throw new Error('Signup failed');
    }
};

export const signupjobseeker = async (data: Jobseeker) => {
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
