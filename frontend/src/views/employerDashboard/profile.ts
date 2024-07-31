
// import bootstrap from "bootstrap";
import { Employer, getEmployer } from "../../interfaces/Users";
import { updateEmployer } from "../../scripts/services/employer";
import { populateEmployerTemplate } from "../../utils/replaceTemplateVar";
import { loadContent } from "./employerDashboard";

 



export function printsth(){
    console.log("sth isss");
}
export async function loadEmployerProfile(employer:getEmployer) {
    console.log("From employer profile")
    console.log(employer);
    console.log(employer.contactNo);
    const HTML = await fetch('./src/views/employerDashboard/profile.html').then(response => response.text());
    const contentHTML = populateEmployerTemplate(HTML,employer);
        return contentHTML;
}

export async function updateEmployerForm(event:Event){
    event.preventDefault();
    console.log('update employer clicked')
    const formData=
     {
        name: (document.getElementById('profileName') as HTMLInputElement).value,
        email: (document.getElementById('profileEmail') as HTMLInputElement).value,
        companyContact: (document.getElementById('profileContact') as HTMLInputElement).value,
        companyLocation: (document.getElementById('profileLocation') as HTMLInputElement).value,
        conpanyDescription: (document.getElementById('profileDescription') as HTMLTextAreaElement).value,
    };
    console.log(formData);
    const response = await updateEmployer(formData);
    if (response.data.message === "Profile updated successfully") {
        loadContent('company-profile');
    } else {
        alert('Failed to update profile: ' + response.data.error);
    }
}


