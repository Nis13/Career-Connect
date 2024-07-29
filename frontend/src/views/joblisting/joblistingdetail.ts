import { joblistingById } from '../../scripts/services/joblistingdetail';
import { populateTemplate } from "../../utils/replaceTemplateVar";

export const joblistingDetail =  async (listing_id:number) =>{
    try {
        const data = await joblistingById(listing_id);
        // console.log("from detail");
        // console.log(data);
        data.type = 'JoblistingDetail';
        const htmlFile = await fetch('/src/views/joblisting/joblistingdetail.html').then(response => response.text());
        // data.logo = 'src/'+data.logo;
        console.log(data.logo);
        const htmlString = populateTemplate(htmlFile, data);
        const addedHtmlString = htmlString;
        return addedHtmlString;
      } catch (error) {
        console.log("Error during listing:", error);
      }
}