import { updateJoblisting } from './../../interfaces/joblisting';
import axios from "axios";
import { BASE_URL} from "../../constants/urls";
import { getToken } from '../../utils/token';

export const handleUpdateJoblisting = async (jobData:updateJoblisting) => {
    try {
      const token = getToken();
      console.log(token);
      const response = await axios.put(`${BASE_URL}/joblisting/${jobData.listingId}`,
        jobData,
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
  };