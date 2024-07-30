import {  JoblistingDetail } from "../../interfaces/joblisting";
import { populateTemplate } from '../../utils/replaceTemplateVar';

export const showJoblisting =  async (data:JoblistingDetail[]) =>{
    try {
        // const data = await joblisting();
        // console.log("from show");
        // console.log(data);
        console.log(data);
        const filterHtml = await fetch('/src/views/joblisting/jobfilter.html').then(response => response.text())
        
        const htmlFile = await fetch('/src/views/joblisting/joblisting.html').then(response => response.text());
        const htmlString = data.map((data:JoblistingDetail) => populateTemplate(htmlFile, data)).join('');
        const addedHtmlString = filterHtml+'<div class="container mt-4 p-5"><div class="row">'+htmlString+"</div></div>";
        console.log("From show job listing");
        // addJobTileEventListeners();
        return addedHtmlString;
      } catch (error) {
        console.log("Error during listing:", error);
      }
}
export const showFilterJoblisting =  async (data:JoblistingDetail[]) =>{
  try {
      // const data = await joblisting();
      // console.log("from show");
      // console.log(data);
      console.log(data);
      // const filterHtml = await fetch('/src/views/joblisting/jobfilter.html').then(response => response.text())
      
      const htmlFile = await fetch('/src/views/joblisting/joblisting.html').then(response => response.text());
      const htmlString = data.map((data:JoblistingDetail) => populateTemplate(htmlFile, data)).join('');
      const addedHtmlString = '<div class="container mt-4 p-5"><div class="row">'+htmlString+"</div></div>";
      console.log("From show job listing");
      // addJobTileEventListeners();
      return addedHtmlString;
    } catch (error) {
      console.log("Error during listing:", error);
    }
}

export const showJoblistingByEmployer =  async (data:JoblistingDetail[]) =>{
  try {
      // const data = await joblisting();
      // console.log("from show");
      // console.log(data);
      console.log(data);
      // const filterHtml = await fetch('/src/views/joblisting/jobfilter.html').then(response => response.text())
      
      const htmlFile = await fetch('/src/views/joblisting/joblisting.html').then(response => response.text());
      const htmlString = data.map((data:JoblistingDetail) => populateTemplate(htmlFile, data)).join('');
      const addedHtmlString = '<div class="container mt-4 p-5"><div class="row">'+htmlString+"</div></div>";
      console.log("From show job listing");
      // addJobTileEventListeners();
      return addedHtmlString;
    } catch (error) {
      console.log("Error during listing:", error);
    }
}

