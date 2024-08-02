import { navigateTo } from '../../scripts/eventHandlers/eventHandler';
import { joblistingById } from '../../scripts/services/joblistingdetail';
import { handleUpdateJoblisting } from '../../scripts/services/updateJoblisting';
import { populateTemplate } from "../../utils/replaceTemplateVar";

export const getJoblistingform =  async (listing_id:number) =>{
    try {
        const data = await joblistingById(listing_id);
        data.type = 'JoblistingDetail';
        
        const htmlFile = await fetch('/src/views/joblisting/updateJoblisting.html').then(response => response.text());
        const htmlString = populateTemplate(htmlFile, data);
        const addedHtmlString = htmlString;
        return addedHtmlString;
      } catch (error) {
        console.log("Error during listing:", error);
      }
}

export const updateJoblisting = async(listing_id:number) =>{
  const title = (document.getElementById('title') as HTMLInputElement).value;
  const jobDescription = (document.getElementById('jobDescription')as HTMLTextAreaElement).value;
  const requirements = (document.getElementById('requirements')as HTMLTextAreaElement).value;
  const benefits = (document.getElementById('benefits')as HTMLTextAreaElement).value;
  const location = (document.getElementById('location')as HTMLInputElement).value;
  const salaryRange = (document.getElementById('salaryRange')as HTMLInputElement).value;
  const jobType = (document.getElementById('jobType')as HTMLSelectElement).value;
  const jobStatus = (document.getElementById('jobStatus')as HTMLSelectElement).value;

  const jobListing = {
          listingId:listing_id,
          title:title,
          jobDescription:jobDescription,
          requirements:requirements,
          benefits:benefits,
          location:location,
          salaryRange:salaryRange,
          jobType:jobType,
          jobStatus:jobStatus
  
  }

  try {
      const response = await handleUpdateJoblisting(jobListing);
      console.log("message:", response.data);
      alert(response.data);
      navigateTo('/');
    } catch (error) {
      console.log("Error during signup:", error);
    }
}
