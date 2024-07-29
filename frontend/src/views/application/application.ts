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

 
  console.log('apply application');


  const resume = (document.getElementById('resume') as HTMLInputElement).value;
  const coverletter = (document.getElementById('coverletter') as HTMLInputElement).value;
  const message = (document.getElementById('message') as HTMLInputElement).value;

  const applicationData = {
    resume:resume,
    coverLetter:coverletter,
    message:message
  }

  try {
    const target = event.currentTarget as HTMLElement;
    console.log("target");
    console.log(target);
    if (target && target.dataset.id) {
      const jobId = target.dataset.id;
      console.log(jobId);
      const response = await handleJobApply(parseInt(jobId),applicationData);
      console.log("message:", response.message);
      alert(response.message);
    }
    // navigateTo('/');
  } catch (error) {
    console.log("Error during signup:", error);
  }

}