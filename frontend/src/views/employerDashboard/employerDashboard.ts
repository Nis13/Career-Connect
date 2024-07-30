import { addJobTileEventListeners } from "../../scripts/eventHandlers/eventHandler";
import { joblisting, joblistingByUserId } from "../../scripts/services/joblisting";
import { showJoblisting, showJoblistingByEmployer } from "../joblisting/joblisting";

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
                const applicationsResponse = await fetch('/src/views/employerDashboard/applications.html');
                contentHTML = await applicationsResponse.text();
                break;
            case 'company-profile':
                const profileResponse = await fetch('/src/views/employerDashboard/profile.html');
                contentHTML = await profileResponse.text();
                break;
            default:
                const defaultResponse = await fetch('/src/views/employerDashboard/dashboard.html');
                contentHTML = await defaultResponse.text();
        }

        (document.getElementById('dashboard-left-container') as HTMLElement).innerHTML = contentHTML;
        if (option == 'job-postings')addJobTileEventListeners();
    } catch (error) {
        console.error('Error loading content:', error);
        (document.getElementById('dashboard-left-container') as HTMLElement).innerHTML = '<p>Error loading content.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadContent('dashboard');
});
