import axios from "axios";
import { BASE_URL, GET_JOB_LISTING } from "../../constants/urls";
import { JobFilter } from "../../interfaces/joblisting";
import { getToken } from "../../utils/token";

export const joblisting = async () => {
    try {
      const response = await axios.get(`${BASE_URL}${GET_JOB_LISTING}`,{
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('joblisting get failed');
    }
  };

  export const joblistingFilter = async (jobFilter:JobFilter) =>{
    try {
      const response = await axios.get(`${BASE_URL}${GET_JOB_LISTING}/job?name=${jobFilter.companyName}&title=${jobFilter.title}&location=${jobFilter.Location}&jobType=${jobFilter.jobType}&jobStatus=${jobFilter.jobStatus}`,{
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('joblisting get failed');
    }
  }

  export const joblistingByUserId = async () => {
    try {
      const token = getToken();
      const response = await axios.get(`http://localhost:8000/joblisting/myposts`,
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

  export const totaljobpostByUser = async () =>{
    try {
      const token = getToken();
      const response = await axios.get(`http://localhost:8000/joblisting/totalJobposted`,
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
  export const totalActiveJob = async () =>{
    try {
      const token = getToken();
      const response = await axios.get(`http://localhost:8000/joblisting/totalActiveJob`,
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