import { addJobTileEventListeners } from "../../scripts/eventHandlers/jobEvents";
import { joblistingFilter } from "../../scripts/services/joblisting";
import { showFilterJoblisting} from "./joblisting";

export const showJoblistingFilter =  async (event:Event) =>{
    event.preventDefault();
        const title = (document.getElementById('title') as HTMLInputElement).value.trim();
        const companyName = (document.getElementById('companyName') as HTMLInputElement).value.trim();
        const location = (document.getElementById('location') as HTMLInputElement).value.trim();
        const jobType = (document.getElementById('jobType') as HTMLSelectElement).value;
        const jobStatus = (document.getElementById('jobStatus')as HTMLSelectElement).value;

        const filter = {
            title: title ,
            companyName: companyName ,
            Location: location,
            jobType: jobType ,
            jobStatus: jobStatus 
        };
        try {

            const response = await joblistingFilter(filter);
            console.log(response);
            // const filterJob =  document.getElementById('joblistings-container')!;
            const filterJob =  document.getElementById('filter-job')!;
            let htmlString = '<h1>Filtered Jobs</h1>';
            if (response.length == 0) htmlString = `<h1>No  Filtered Jobs to Show</h1>`;
            else{
                htmlString += await showFilterJoblisting(response) || '';
            }
            filterJob.innerHTML = htmlString;

           addJobTileEventListeners();
      } catch (error) {
        console.log("Error during listing:", error);
      }
}