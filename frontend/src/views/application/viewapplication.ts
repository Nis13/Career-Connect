import { ApplicationList, employerViewApplication } from "../../interfaces/Application";
import { populateApplicationTemplate} from "../../utils/replaceTemplateVar";

export const getApplicationById =  async (data:employerViewApplication[]) =>{
    try {
        if (data.length == 0) return "<h1>No Application to show to show</h1>";
        const htmlFile = await fetch('/src/views/application/viewapplication.html').then(response => response.text());
        const htmlString = data.map((data:employerViewApplication) => populateApplicationTemplate(htmlFile, data)).join('');
        const addedHtmlString = '<div class="container mt-4 p-5"><div class="row">'+htmlString+"</div></div>";
        console.log(data);
        return addedHtmlString;
      } catch (error) {
        console.log("Error during listing:", error);
      }
}