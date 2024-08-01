import { getEmployer, getJobseeker } from "../../interfaces/Users";
import { populateEmployerTemplate, populateJobseekerTemplate } from "../../utils/replaceTemplateVar";

export async function loadJobseekerProfile(jobseeker:getJobseeker) {
    console.log("From employer profile")
    console.log(jobseeker);
    console.log(jobseeker.contactNo);
    const HTML = await fetch('/src/views/jobseekerDashboard/profile.html').then(response => response.text());
    const contentHTML = populateJobseekerTemplate(HTML,jobseeker);
        return contentHTML;
}