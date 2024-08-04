import axios from "axios";
import { getToken } from "../../utils/token";
import {  User } from "../../interfaces/Users";

  export const updateEmployer = async (id:number,updateData: Partial<User>) =>{
    try {
      const token = getToken();
      const response = await axios.put(`http://localhost:8000/admin/updateprofile/${id}`,
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

  export const getallAdmin = async () =>{
    try {
      const token = getToken();
      const response = await axios.get(`http://localhost:8000/admin/all`,
        {
          headers: {
          Authorization: `Bearer ${token}`
        }}
      );
      console.log("from all")
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error('admin get failed');
    }
  }

  export const getallAdminById = async (id:number) =>{
    try {
      const token = getToken();
      const response = await axios.get(`http://localhost:8000/admin/${id}`,
        {
          headers: {
          Authorization: `Bearer ${token}`
        }}
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error('admin get failed');
    }
  }

  export const createAdmin = async (adminData:User) =>{
    try {
      const token = getToken();
      const response = await axios.post(`http://localhost:8000/admin/create`,
        adminData,
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
  export const deleteAdminById = async (id:number) =>{
    try {
      const token = getToken();
      const response = await axios.delete(`http://localhost:8000/admin/${id}`,
        {
          headers: {
          Authorization: `Bearer ${token}`
        }}
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error('admin delete failed');
    }
  }
  