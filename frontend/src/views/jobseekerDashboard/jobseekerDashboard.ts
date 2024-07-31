import { getApplicationByEmployerId, getApplicationByJobseekerId } from "../../scripts/services/application";
import { getJobseekerDetail } from "../../scripts/services/jobseeker";
import { getApplicationById } from "../application/viewapplication";
import { loadJobseekerProfile } from "./profile";

export async function loadContentJobseeker(option: string) {
    let contentHTML: string = '';

    try {
        switch (option) {
            case 'dashboard':
                contentHTML = "job seeker dashboard"
                break;
            case 'job-postings':
                contentHTML = 'job listings'
                break;
            case 'applications':
                // contentHTML = 'job applications'
                const applications = await getApplicationByJobseekerId();
                contentHTML = await getApplicationById(applications) || '';

                // const applicationsResponse = await fetch('/src/views/employerDashboard/applications.html');
                // contentHTML = await applicationsResponse.text();
                break;
            case 'jobseeker-profile':
                console.log('job seeker dashboard');
                const response = await getJobseekerDetail();
                console.log(response);
                contentHTML = await loadJobseekerProfile(response);
                // const profileResponse = await fetch('/src/views/employerDashboard/profile.html');
                // contentHTML = await profileResponse.text();
                break;
            default:
                const defaultResponse = await fetch('/src/views/jobseekerDashboard/dashboard.html');
                contentHTML = await defaultResponse.text();
        }

        (document.getElementById('dashboard-left-container') as HTMLElement).innerHTML = contentHTML;

        showJobBtn()
    } catch (error) {
        console.log('Error loading content:', error);
        (document.getElementById('dashboard-left-container') as HTMLElement).innerHTML = '<p>Error loading content.</p>';
    }
}

export function showJobBtn(){
    const viewJobButtons =  (document.querySelectorAll(".apply-btn") as NodeListOf<HTMLButtonElement>)
    viewJobButtons.forEach(button => {
        button.style.display = "block";
      });
}