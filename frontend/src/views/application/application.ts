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

 const formData = new FormData();
  const resume = (document.getElementById('resume') as HTMLInputElement).files![0];
  const coverletter = (document.getElementById('coverletter') as HTMLInputElement).value;
  let message = (document.getElementById('message') as HTMLInputElement).value;
  if (!message) message = "No Message";
  // const applicationData = {
  //   resume:resume,
  //   coverLetter:coverletter,
  //   message:message
  // }
  console.log(resume);
  formData.append('resume',resume);
  formData.append('coverLetter',coverletter);
  formData.append('additionalMessage',message)

  try {
    const target = event.currentTarget as HTMLElement;
    console.log("target");
    console.log(target);
    if (target && target.dataset.id) {
      const jobId = target.dataset.id;
      console.log(jobId);
      console.log(formData)
      const response = await handleJobApply(parseInt(jobId),formData);
      console.log("message:", response.message);
      alert(response.message);
    }
    // navigateTo('/');
  } catch (error) {
    console.log("Error during signup:", error);
  }

}