import axios from "axios";
import { BASE_URL, GET_JOB_LISTING } from "../../constants/urls";

export const joblistingById = async (listingId:number) => {
    try {
      const response = await axios.get(`${BASE_URL}${GET_JOB_LISTING}/${listingId}`,{
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