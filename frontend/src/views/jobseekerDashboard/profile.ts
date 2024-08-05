import { updateJobseekerByAdmin } from './../../scripts/services/jobseeker';
import {  getJobseeker } from "../../interfaces/Users";
import { navigateTo } from "../../scripts/eventHandlers/eventHandler";
import { updateJobseeker } from "../../scripts/services/jobseeker";
import {  populateJobseekerTemplate } from "../../utils/replaceTemplateVar";
import { totalJobApplied, totalJobRejected } from '../../scripts/services/application';
import { showError, validateContactNumber, validateEmail } from '../../utils/validation';

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

if (!formData.name) {
    showError("name", "Name is required.");
    return;
}
if (!formData.email) {
    showError("email", "Email is required.");
    return;
}
if (!formData.contactNo) {
    showError("jobseekerContact", "Contact is required.");
    return;
  }
  if (!formData.education) {
    showError("jobseekerEducation", "Education is required.");
    return;
}
if (!formData.skills) {
  showError("jobseekerSkills", "Skill is required.");
  return;
}
if (!formData.industry) {
  showError("jobseekerIndustry", "Industry is required.");
  return;
}
if (!validateEmail(formData.email)) {
    showError("email", "Invalid email format.");
    return;
  }

  if (!validateContactNumber(formData.contactNo.toString())) {
    showError("jobseekerContact", "Company Contact must be 9 or 10 digits.");
    return;
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

export async function jobseekerDash(){
        const totalJobapplied = await totalJobApplied();
        const totalJobrejected = await totalJobRejected();
        const totalpending = totalJobapplied - totalJobrejected;
    
        const HTML = `<div class="container mt-4">
            <h1 class="text-center mb-4">My Dashboard</h1>
            <div class="row">
                <div class="col-md-4 mb-4">
                    <div class="card text-white border-color h-100 d-flex justify-content-center align-items-center bg-light shadow">
                        <div class="card-body text-center ">
                            <h5 class="card-title">Total Job Applied</h5>
                            <p class="card-text display-3 font-weight-bold">${totalJobapplied}</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="card text-white border-color h-100 d-flex justify-content-center align-items-center bg-light shadow">
                        <div class="card-body text-center">
                            <h5 class="card-title">Total Pending</h5>
                            <p class="card-text display-3 font-weight-bold">${totalpending}</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="card text-white border-color h-100 d-flex justify-content-center align-items-center bg-light shadow">
                        <div class="card-body text-center">
                            <h5 class="card-title">Total Job Rejected</h5>
                            <p class="card-text display-3 font-weight-bold">${totalJobrejected}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                        `
        return HTML;
    }

