import { joblisting } from './../../scripts/services/joblisting';
import { Joblisting } from "../../interfaces/joblisting";
import { populateTemplate } from '../../utils/replaceTemplateVar';

export const showJoblisting =  async () =>{
    try {
        const data = await joblisting();
        // console.log("from show");
        // console.log(data);

        const htmlFile = await fetch('/src/views/joblisting/joblisting.html').then(response => response.text());
        const htmlString = data.map((job:Joblisting) => populateTemplate(htmlFile, job)).join('');
        const addedHtmlString = '<div class="container mt-4 p-5"><div class="row">'+htmlString+"</div></div>";
        // addJobTileEventListeners();
        return addedHtmlString;
      } catch (error) {
        console.log("Error during listing:", error);
      }
}
