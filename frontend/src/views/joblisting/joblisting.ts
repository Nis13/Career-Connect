import { joblisting } from './../../scripts/services/joblisting';
import { Joblisting, JoblistingDetail } from "../../interfaces/joblisting";
import { populateTemplate } from '../../utils/replaceTemplateVar';

export const showJoblisting =  async () =>{
    try {
        const data = await joblisting();
        // console.log("from show");
        // console.log(data);
        const filterHtml = await fetch('/src/views/joblisting/jobfilter.html').then(response => response.text())

        const htmlFile = await fetch('/src/views/joblisting/joblisting.html').then(response => response.text());
        const htmlString = data.map((job:JoblistingDetail) => populateTemplate(htmlFile, job)).join('');
        const addedHtmlString = filterHtml+'<div class="container mt-4 p-5"><div class="row">'+htmlString+"</div></div>";
        // addJobTileEventListeners();
        return addedHtmlString;
      } catch (error) {
        console.log("Error during listing:", error);
      }
}
