import axios from "axios";
import { getToken } from "../../utils/token";

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