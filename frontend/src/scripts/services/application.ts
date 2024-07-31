

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

  export const getApplicationByJobId = async(listing_id:number) =>{
    try {
      console.log('from service')
      console.log(listing_id);
      console.log(`${BASE_URL}/application/byjob/${listing_id}`);
      const response = await axios.get(`${BASE_URL}/application/byjob/${listing_id}`,{
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error('joblisting get failed');
    }
  }
  export const getApplicationByEmployerId = async() =>{
    try {
      const token = getToken();
      console.log('from service')
      console.log(`${BASE_URL}/application/getbyemployer/`);
      const response = await axios.get(`http://localhost:8000/application/getbyemployer`,
        {
          headers: {
          Authorization: `Bearer ${token}`
        }}
      );
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error('joblisting get failed');
    }
  }
  export const getApplicationByJobseekerId = async() =>{
    try {
      const token = getToken();
      console.log('from service')
      console.log(`http://localhost:8000/application/getbyjobseeker`);
      const response = await axios.get(`http://localhost:8000/application/getbyjobseeker`,
        {
          headers: {
          Authorization: `Bearer ${token}`
        }}
      );
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error('joblisting get failed');
    }
  }
  

  export const handleChangeStatus = async (application_id:number,status:string) => {
    try {
      
      const response = await axios.put(`${BASE_URL}/application/${application_id}`,
        {applicationStatus:status}
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return 'joblisting get failed';
    }
  };