import { navigateTo } from "../../scripts/eventHandlers/eventHandler";
import {  handleAddJoblisting } from "../../scripts/services/addJoblisting";

export const addjoblisting = async (event:Event) =>{
    event.preventDefault();

    console.log("post job clicked");

    const title = (document.getElementById('title') as HTMLInputElement).value;
    const jobDescription = (document.getElementById('description')as HTMLTextAreaElement).value;
    const requirements = (document.getElementById('requirements')as HTMLTextAreaElement).value;
    const benefits = (document.getElementById('benefits')as HTMLTextAreaElement).value;
    const location = (document.getElementById('location')as HTMLInputElement).value;
    const salaryMin = (document.getElementById('salaryMin')as HTMLInputElement).value;
    const salaryMax = (document.getElementById('salaryMax')as HTMLInputElement).value;
    const jobType = (document.getElementById('jobType')as HTMLSelectElement).value;
    
    const salaryRange = `${salaryMin}-${salaryMax}`;

    const jobListing = {
        
            title:title,
            jobDescription:jobDescription,
            requirements:requirements,
            benefits:benefits,
            location:location,
            salaryRange:salaryRange,
            jobType:jobType,
            createdBy:1
    
    }

    try {
        const response = await handleAddJoblisting(jobListing);
        console.log(response);

        alert(response);
        if (response == 'job created successfully') navigateTo('/joblisting');
    }
    catch (error) {
        console.log("Error during signup:", error);
      }
    }