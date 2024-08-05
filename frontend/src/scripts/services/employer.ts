import axios from "axios";
import { getToken } from "../../utils/token";
import { getEmployer } from "../../interfaces/Users";

export const getEmployerDetail = async () => {
    try {
      const token = getToken();
      const response = await axios.get(`http://localhost:8000/employer/detail`,
        {
          headers: {
          Authorization: `Bearer ${token}`
        }}
      );
      return response.data;
    } catch (error) {
      throw new Error('joblisting get failed');
    }
  };

  export const getEmployerImage = async () =>{
    try {
      const token = getToken();
      const response = await axios.get(`http://localhost:8000/employer/image`,
        {
          headers: {
          Authorization: `Bearer ${token}`
        }}
      );
      return response.data;
    } catch (error) {
      throw new Error('joblisting get failed');
    }
  }

  export const updateEmployer = async (updateData: Partial<getEmployer>) =>{
    try {
      const token = getToken();
      const response = await axios.put(`http://localhost:8000/employer/updateprofile`,
        updateData,
        {
          headers: {
          Authorization: `Bearer ${token}`
        }}
      );
      return response;
    } catch (error) {
      throw new Error('joblisting get failed');
    }
  }

  export const getallEmployer = async () =>{
    try {
      const token = getToken();
      const response = await axios.get(`http://localhost:8000/employer/getall`,
        {
          headers: {
          Authorization: `Bearer ${token}`
        }}
      );
      return response.data;
    } catch (error) {
      throw new Error('joblisting get failed');
    }
  }

  