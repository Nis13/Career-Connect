import { addJoblisting } from './../../interfaces/joblisting';
import axios from "axios";
import { BASE_URL} from "../../constants/urls";
import { getToken } from '../../utils/token';

export const handleAddJoblisting = async (jobData:addJoblisting) => {
    try {
      const token = getToken();
      console.log(token);
      const response = await axios.post(`${BASE_URL}/joblisting`,
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