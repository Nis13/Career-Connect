import axios from "axios";
import { getToken } from "../../utils/token";
import { Jobseeker } from "../../interfaces/Users";

export const getJobseekerDetail = async () => {
    try {
      const token = getToken();
      const response = await axios.get(`http://localhost:8000/jobseeker/detail`,
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

  export const updateJobseeker = async (updateData: Partial<Jobseeker>) =>{
    try {
      const token = getToken();
      const response = await axios.put(`http://localhost:8000/jobseeker/updateprofile`,
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

  export const getallJobseeker = async () =>{
    try {
      const token = getToken();
      const response = await axios.get(`http://localhost:8000/jobseeker/getall`,
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

  export const deleteUser = async (userId:number) => {
    try {
      const token = getToken();
      const response = await axios.delete(`http://localhost:8000/jobseeker/deleteuser/${userId}`,
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

  export const updateJobseekerByAdmin = async (userId:number,updateData: Partial<Jobseeker>) =>{
    try {
      const token = getToken();
      const response = await axios.put(`http://localhost:8000/jobseeker/updateprofile/${userId}`,
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