import { Application } from "../../interfaces/Application";
import { populateBriefApplicationTemplate } from "../../utils/replaceTemplateVar";

export const showApplicationById =  async (data:Application) =>{
    try {
        // if (data.length == 0) return "<h1>No Application to show to show</h1>";
        console.log("See application")
        const htmlFile = await fetch('/src/views/application/seeapplication.html').then(response => response.text());
        const htmlString = populateBriefApplicationTemplate(htmlFile, data);
        const addedHtmlString = '<div class="container mt-4 p-5"><div class="row">'+htmlString+"</div></div>";
        console.log(data);
        return addedHtmlString;
      } catch (error) {
        console.log("Error during application:", error);
      }
}