import { Application } from "../../interfaces/Application";
import { populateBriefApplicationTemplate } from "../../utils/replaceTemplateVar";

export const showApplicationById =  async (data:Application) =>{
    try {
        const htmlFile = await fetch('/src/views/application/seeapplication.html').then(response => response.text());
        const htmlString = populateBriefApplicationTemplate(htmlFile, data);
        const addedHtmlString = '<div class="container mt-4 p-5"><div class="row">'+htmlString+"</div></div>";
        return addedHtmlString;
      } catch (error) {
        return '<h1>Error duting fetching';
      }
}