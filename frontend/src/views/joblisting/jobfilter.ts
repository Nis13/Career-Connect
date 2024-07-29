import { joblistingFilter } from "../../scripts/services/joblisting";

export const showJoblistingFilter =  async (event:Event) =>{
    event.preventDefault();
        const title = (document.getElementById('title') as HTMLInputElement).value.trim();
        const companyName = (document.getElementById('companyName') as HTMLInputElement).value.trim();
        const location = (document.getElementById('location') as HTMLInputElement).value.trim();
        const jobType = (document.getElementById('jobType') as HTMLInputElement).value;
        const jobStatus = (document.getElementById('jobStatus' )as HTMLInputElement).value;

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
      } catch (error) {
        console.log("Error during listing:", error);
      }
}