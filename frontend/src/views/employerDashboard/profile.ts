import {getEmployer } from "../../interfaces/Users";
import { navigateTo } from "../../scripts/eventHandlers/eventHandler";
import { updateEmployer } from "../../scripts/services/employer";
import { populateEmployerTemplate } from "../../utils/replaceTemplateVar";

export async function loadEmployerProfile(employer:getEmployer) {
    console.log("From employer profile")
    console.log(employer);
    const HTML = await fetch('/src/views/employerDashboard/profile.html').then(response => response.text());
    console.log(HTML);
    const contentHTML = populateEmployerTemplate(HTML,employer);
    // console.log(contentHTML);
        return contentHTML;
}

export async function updateEmployerForm(event:Event){
    event.preventDefault();
    console.log('update employer clicked')
    const formData=
     {
        name: (document.getElementById('profileName') as HTMLInputElement).value,
        email: (document.getElementById('profileEmail') as HTMLInputElement).value,
        companyContactNo: (document.getElementById('profileContact') as HTMLInputElement).value,
        companyLocation: (document.getElementById('profileLocation') as HTMLInputElement).value,
        companyDescription: (document.getElementById('profileDescription') as HTMLTextAreaElement).value,
    };
    console.log(formData);
    const response = await updateEmployer(formData);
    if (response.data.message === "Profile updated successfully") {
        navigateTo('/employerdashboard/companyprofile');
    } else {
        alert('Failed to update profile: ' + response.data.error);
    }
}


