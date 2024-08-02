import {getEmployer } from "../../interfaces/Users";
import { navigateTo } from "../../scripts/eventHandlers/eventHandler";
import { updateEmployer } from "../../scripts/services/employer";
import { populateEmployerTemplate } from "../../utils/replaceTemplateVar";

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
    const response = await updateEmployer(formData);
    if (response.data.message === "Profile updated successfully") {
        navigateTo('/employerdashboard/companyprofile');
    } else {
        alert('Failed to update profile: ' + response.data.error);
    }
}


