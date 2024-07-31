import { addJobTileEventListeners, changeStatus, navigateTo, seeJobApplication } from "../../scripts/eventHandlers/eventHandler";
import { getApplicationByEmployerId } from "../../scripts/services/application";
import { getEmployerDetail } from "../../scripts/services/employer";
import {  joblistingByUserId } from "../../scripts/services/joblisting";
import { getApplicationforEmployer } from "../application/viewapplication";

import { showJoblistingByEmployer } from "../joblisting/joblisting";
import { loadEmployerProfile,updateEmployerForm } from "./profile";

export async function loadContent(option: string) {
    let contentHTML: string = '';

    try {
        switch (option) {
            case 'dashboard':
                const dashboardResponse = await fetch('/src/views/employerDashboard/dashboard.html');
                contentHTML = await dashboardResponse.text();
                break;
            case 'job-postings':
                const jobData = await joblistingByUserId();
                contentHTML = await showJoblistingByEmployer(jobData) || '';
                break;
            case 'applications':
                const applications = await getApplicationByEmployerId();
                contentHTML = await getApplicationforEmployer(applications) || '';
                break;

            case 'company-profile':
                const response = await getEmployerDetail();
                contentHTML = await loadEmployerProfile(response);
                console.log(response);
                // const profileResponse = await fetch('/src/views/employerDashboard/profile.html');
                // contentHTML = await profileResponse.text();
                break;
            default:
                const defaultResponse = await fetch('/src/views/employerDashboard/dashboard.html');
                contentHTML = await defaultResponse.text();
        }

        (document.getElementById('dashboard-left-container') as HTMLElement).innerHTML = contentHTML;
        if (option == 'job-postings')addJobTileEventListeners();
        if (option == 'applications') {
            seeJobApplication();
            changeStatus();}
            viewJob();
            viewUser();
        if (option == 'company-profile')  editProfileEvent();
        showJobBtn();
    } catch (error) {
        console.error('Error loading content:', error);
        (document.getElementById('dashboard-left-container') as HTMLElement).innerHTML = '<p>Error loading content.</p>';
    }
}


function showJobBtn(){
    const viewJobButtons = document.querySelectorAll(".change-status-btn") as NodeListOf<HTMLButtonElement>;

    viewJobButtons.forEach(button => {
    button.style.display = "block";
    
});
}

export function viewJob(){
    const viewJobButtons = document.querySelectorAll(".view-job-btn") as NodeListOf<HTMLButtonElement>;

    viewJobButtons.forEach(button => {
    button.addEventListener("click", () => {
        const jobId = (button as HTMLButtonElement).dataset.id!;;
        console.log(jobId);
        navigateTo(`/jobdetail/${jobId}`);
    })
    
});}
function viewUser(){
    const viewJobButtons = document.querySelectorAll(".view-user-btn") as NodeListOf<HTMLButtonElement>;

    viewJobButtons.forEach(button => {
    button.addEventListener("click", () => {
        const applicationId = (button as HTMLButtonElement).dataset.id!;;
        console.log(applicationId);
        navigateTo(`/applicationDetail/${applicationId}`);
    })
    
});
}
function  editProfileEvent(){
    document
        .getElementById('editEmployerProfileForm')
        ?.addEventListener('submit', updateEmployerForm);
}

// document.addEventListener('DOMContentLoaded', () => {
//     loadContent('dashboard');
// });
