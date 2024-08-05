import { navigateTo } from "../../scripts/eventHandlers/eventHandler";
import { handleJobApply } from "../../scripts/services/application";

export const getapplyform =  async (jobId:string) =>{
    try {
        
        const htmlFile = await fetch('/src/views/application/application.html').then(response => response.text());
        const finalString = htmlFile.replace('{{listing_id}}',jobId);
        return finalString;
      } catch (error) {
        console.log("Error during listing:", error);
      }
}

export const addApplication = async (event:Event) =>{
  event.preventDefault();

 const formData = new FormData();
  const resume = (document.getElementById('resume') as HTMLInputElement).files![0];
  const coverletter = (document.getElementById('coverletter') as HTMLInputElement).value;
  let message = (document.getElementById('message') as HTMLInputElement).value;
  if (!message) message = "No Message";
  formData.append('resume',resume);
  formData.append('coverLetter',coverletter);
  formData.append('additionalMessage',message)

  try {
    const target = event.currentTarget as HTMLElement;
    if (target && target.dataset.id) {
      const jobId = target.dataset.id;
      const response = await handleJobApply(parseInt(jobId),formData);
      alert(response.message);
      if (response.message == "Applied successfully") navigateTo('/jobseekerDashboard/myapplications');
    }
    // navigateTo('/');
  } catch (error) {
    console.log("Error during signup:", error);
  }

}