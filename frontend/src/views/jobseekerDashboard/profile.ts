import { updateJobseekerByAdmin } from './../../scripts/services/jobseeker';
import {  getJobseeker } from "../../interfaces/Users";
import { navigateTo } from "../../scripts/eventHandlers/eventHandler";
import { updateJobseeker } from "../../scripts/services/jobseeker";
import {  populateJobseekerTemplate } from "../../utils/replaceTemplateVar";

export async function loadJobseekerProfile(jobseeker:getJobseeker) {
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
    const response = await updateJobseeker(formData);
    if (response.data.message === "jobseeker Profile updated successfully") {
        navigateTo('/jobseekerDashboard/jobseekerprofile');
    } else {
        alert('Failed to update profile: ' + response.data.error);
    }
}

export async function updateJobseekerByAdminForm(event:Event){
    const form = event.target as HTMLFormElement;

    if (!form.id.startsWith('updateJobseeker-')) return;
    event.preventDefault(); 

    const userId = form.id.split('-')[1];
    
    const formData = {
        name: (document.getElementById(`updateName-${userId}`) as HTMLInputElement).value,
        email: (document.getElementById(`updateEmail-${userId}`) as HTMLInputElement).value,
        contactNo: (document.getElementById(`updateContact-${userId}`) as HTMLInputElement).value,
        education:(document.getElementById(`updateEducation-${userId}`) as HTMLTextAreaElement).value,
        skills:(document.getElementById(`updateSkills-${userId}`) as HTMLTextAreaElement).value,
        industry:(document.getElementById(`updateIndustry-${userId}`) as HTMLTextAreaElement).value,
   
}
    const response = await updateJobseekerByAdmin(parseInt(userId),formData);
    if (response.data.message === "jobseeker Profile updated successfully") {
        navigateTo('/adminDashboard/getalljobseeker');
    } else {
        alert('Failed to update profile: ' + response.data.error);
    }
}
