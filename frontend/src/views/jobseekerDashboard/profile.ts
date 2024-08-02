import {  getJobseeker } from "../../interfaces/Users";
import { navigateTo } from "../../scripts/eventHandlers/eventHandler";
import { updateJobseeker } from "../../scripts/services/jobseeker";
import {  populateJobseekerTemplate } from "../../utils/replaceTemplateVar";

export async function loadJobseekerProfile(jobseeker:getJobseeker) {
    console.log("From employer profile")
    console.log(jobseeker);
    console.log(jobseeker.contactNo);
    const HTML = await fetch('/src/views/jobseekerDashboard/profile.html').then(response => response.text());
    const contentHTML = populateJobseekerTemplate(HTML,jobseeker);
        return contentHTML;
}
export async function updateJobseekerForm(event:Event){
    event.preventDefault();
    const formData = {
        name: (document.getElementById('profileName') as HTMLInputElement).value,
        email: (document.getElementById('profileEmail') as HTMLInputElement).value,
        contactNo: (document.getElementById('profileContact') as HTMLInputElement).value,
        education:(document.getElementById("profileEducation") as HTMLTextAreaElement).value,
        skills:(document.getElementById("profileSkills") as HTMLTextAreaElement).value,
        industry:(document.getElementById("profileIndustry") as HTMLTextAreaElement).value,
   
}
    console.log("update form");
    console.log(formData);
    const response = await updateJobseeker(formData);
    if (response.data.message === "jobseeker Profile updated successfully") {
        navigateTo('/jobseekerDashboard/jobseekerprofile');
    } else {
        alert('Failed to update profile: ' + response.data.error);
    }
}