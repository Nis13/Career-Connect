
import axios from "axios";
import { BASE_URL} from "../../constants/urls";
import { getToken} from '../../utils/token';
import { Application } from "../../interfaces/Application";

export const handleJobApply = async (jobId:number,application:Application) => {
    try {
      const token = getToken();
      console.log(application);
      const response = await axios.post(`${BASE_URL}/application/${jobId}`,
        application,
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