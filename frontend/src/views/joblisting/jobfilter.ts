
import { addJobTileEventListeners } from "../../scripts/eventHandlers/eventHandler";
import { joblistingFilter } from "../../scripts/services/joblisting";
import { showFilterJoblisting} from "./joblisting";

export const showJoblistingFilter =  async (event:Event) =>{
    event.preventDefault();
        const title = (document.getElementById('title') as HTMLInputElement).value.trim();
        const companyName = (document.getElementById('companyName') as HTMLInputElement).value.trim();
        const location = (document.getElementById('location') as HTMLInputElement).value.trim();
        const jobType = (document.getElementById('jobType') as HTMLSelectElement).value;
        const jobStatus = (document.getElementById('jobStatus' )as HTMLSelectElement).value;

        const filter = {
            title: title ,
            companyName: companyName ,
            Location: location,
            jobType: jobType ,
            jobStatus: jobStatus 
        };
        try {

            const response = await joblistingFilter(filter);
            const htmlString = await showFilterJoblisting(response);
           const filterJob =  document.getElementById('joblistings-container')!;
           if (filterJob) {
               filterJob.innerHTML = htmlString || '<p>No job listings found.</p>';
           }
           addJobTileEventListeners();
      } catch (error) {
        console.log("Error during listing:", error);
      }
}