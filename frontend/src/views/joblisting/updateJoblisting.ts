import { joblistingById } from '../../scripts/services/joblistingdetail';
import { populateTemplate } from "../../utils/replaceTemplateVar";

export const updateJoblisting =  async (listing_id:number) =>{
    try {
        const data = await joblistingById(listing_id);
        // console.log("from detail");
        // console.log(data);
        data.type = 'JoblistingDetail';
        const htmlFile = await fetch('/src/views/joblisting/updateJoblisting.html').then(response => response.text());
        const htmlString = populateTemplate(htmlFile, data);
        const addedHtmlString = htmlString;
        return addedHtmlString;
      } catch (error) {
        console.log("Error during listing:", error);
      }
}