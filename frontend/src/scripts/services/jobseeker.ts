import axios from "axios";
import { getToken } from "../../utils/token";
import { Jobseeker } from "../../interfaces/Users";

export const getJobseekerDetail = async () => {
    try {
      const token = getToken();
      console.log(token);
      const response = await axios.get(`http://localhost:8000/jobseeker/detail`,
        {
          headers: {
          Authorization: `Bearer ${token}`
        }}
      );
      console.log("from backend jobseeker")
      console.log(response.data);

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
      console.log(response.data);
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
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error('joblisting get failed');
    }
  }