import { Joblisting } from "../../interfaces/joblisting";
import { joblistingById } from '../../scripts/services/joblistingdetail';

export const joblistingDetail =  async (listing_id:number) =>{
    try {
        const data = await joblistingById(listing_id);
        console.log("from detail");
        console.log(data);

        const htmlFile = await fetch('/src/views/joblisting/joblistingdetail.html').then(response => response.text());
        const htmlString = populateTemplate(htmlFile, data);
        const addedHtmlString = htmlString;
        return addedHtmlString;
      } catch (error) {
        console.log("Error during listing:", error);
      }
}
function populateTemplate(template: string, job: Joblisting): string {
    return template
        .replace('{{title}}', job.title)
        .replace('{{listing_id}}',job.listingId)
        .replace('{{benefits}}', job.benefits)
        .replace('{{requirements}}', job.requirements)
        .replace('{{description}}', job.description)
        .replace('{{location}}', job.location)
        .replace('{{jobStatus}}', job.jobStatus)
        .replace('{{jobType}}', job.jobType);
}