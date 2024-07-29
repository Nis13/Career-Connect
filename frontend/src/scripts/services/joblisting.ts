import axios from "axios";
import { BASE_URL, GET_JOB_LISTING } from "../../constants/urls";
import { JobFilter } from "../../interfaces/joblisting";

export const joblisting = async () => {
    try {
      const response = await axios.get(`${BASE_URL}${GET_JOB_LISTING}`,{
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
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
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error('joblisting get failed');
    }
  }