import { ApplicationList } from "../../interfaces/Application";
import { getApplicationByJobId } from "../../scripts/services/application";
import { populateApplicationTemplate} from "../../utils/replaceTemplateVar";

export const getApplicationById =  async (listing_id:number) =>{
    try {
      console.log('from views');
        const data = await getApplicationByJobId(listing_id);
        console.log(data);
        // console.log("from detail");
        // console.log(data);
        // data.type = 'JoblistingDetail';
        const htmlFile = await fetch('/src/views/application/viewapplication.html').then(response => response.text());
        const htmlString = data.map((data:ApplicationList) => populateApplicationTemplate(htmlFile, data)).join('');
        const addedHtmlString = '<div class="container mt-4 p-5"><div class="row">'+htmlString+"</div></div>";
        // data.logo = 'src/'+data.logo;
        console.log(data);
        return addedHtmlString;
      } catch (error) {
        console.log("Error during listing:", error);
      }
}