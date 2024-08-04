import { totalActiveJob} from './../../scripts/services/joblisting';
import {getEmployer } from "../../interfaces/Users";
import { navigateTo } from "../../scripts/eventHandlers/eventHandler";
import { totalApplicationByEmployer } from "../../scripts/services/application";
import { updateEmployer } from "../../scripts/services/employer";
import { totaljobpostByUser } from "../../scripts/services/joblisting";
import { populateEmployerTemplate } from "../../utils/replaceTemplateVar";
import { showError } from '../../utils/validation';

export async function loadEmployerProfile(employer:getEmployer) {
    const HTML = await fetch('/src/views/employerDashboard/profile.html').then(response => response.text());
    const contentHTML = populateEmployerTemplate(HTML,employer);
        return contentHTML;
}

export async function updateEmployerForm(event:Event){
    event.preventDefault();
    const formData= 
     {
        name: (document.getElementById('profileName') as HTMLInputElement).value,
        email: (document.getElementById('profileEmail') as HTMLInputElement).value,
        companyContactNo: (document.getElementById('profileContact') as HTMLInputElement).value,
        companyLocation: (document.getElementById('profileLocation') as HTMLInputElement).value,
        companyDescription: (document.getElementById('profileDescription') as HTMLTextAreaElement).value,
    };
    if (!formData.name) {
        showError("name", "Name is required.");
        return;
    }
    if (!formData.email) {
        showError("email", "Email is required.");
        return;
    }
    if (!formData.companyContactNo) {
        showError("jobseekerContact", "Contact is required.");
        return;
      }
      if (!formData.companyLocation) {
        showError("location", "Contact is required.");
        return;
      }
      if (!formData.companyDescription) {
        showError("description", "Contact is required.");
        return;
      }

    const response = await updateEmployer(formData);
    // alert(response.data.message);
    if (response.data.message === "Profile updated successfully") {
        navigateTo('/employerdashboard/companyprofile');
    } else {
        alert('Failed to update profile: ' + response.data.error);
    }
}

export async function loadEmployerDash(){
    const totalJobposted = await totaljobpostByUser();
    const totalApplication = await totalApplicationByEmployer();
    const totalActive = await totalActiveJob();
    const totalInactiveJob = totalJobposted-totalActive;

    const HTML = `<div class="container mt-4">
        <h1 class="text-center mb-4">Employer Dashboard</h1>
        <div class="row">
            <div class="col-md-6 mb-4">
                <div class="card text-white border-color h-100 d-flex justify-content-center align-items-center bg-light shadow">
                    <div class="card-body text-center ">
                        <h5 class="card-title">Total Job Posted</h5>
                        <p class="card-text display-3 font-weight-bold">${totalJobposted}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6 mb-4">
                <div class="card text-white border-color h-100 d-flex justify-content-center align-items-center bg-light shadow">
                    <div class="card-body text-center">
                        <h5 class="card-title">Total Applications Received</h5>
                        <p class="card-text display-3 font-weight-bold">${totalApplication}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6 mb-4">
                <div class="card text-white border-color h-100 d-flex justify-content-center align-items-center bg-light shadow">
                    <div class="card-body text-center">
                        <h5 class="card-title">Total Active Jobs</h5>
                        <p class="card-text display-3 font-weight-bold">${totalActive}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6 mb-4">
                <div class="card text-white border-color h-100 d-flex justify-content-center align-items-center bg-light shadow">
                    <div class="card-body text-center">
                        <h5 class="card-title">Total Inactive Jobs</h5>
                        <p class="card-text display-3 font-weight-bold">${totalInactiveJob}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
                    `
    return HTML;
}


