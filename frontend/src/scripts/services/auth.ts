// frontend/src/scripts/services/auth.ts

import axios from 'axios';
import { Employer, UserCredentials } from '../../interfaces/Users';



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

export const signup = async (data: Employer) => {
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
