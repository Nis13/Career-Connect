import { navigateTo } from "../../scripts/eventHandlers/eventHandler";
import { updateJobseekerForm } from "../jobseekerDashboard/profile";
import { updateEmployerForm } from "./profile";

export function viewJob(){
    const viewJobButtons = document.querySelectorAll(".view-job-btn") as NodeListOf<HTMLButtonElement>;

    viewJobButtons.forEach(button => {
    button.addEventListener("click", () => {
        const jobId = (button as HTMLButtonElement).dataset.id!;;
        navigateTo(`/jobdetail/${jobId}`);
    })
    
});}
export function viewUser(){
    const viewJobButtons = document.querySelectorAll(".view-user-btn") as NodeListOf<HTMLButtonElement>;

    viewJobButtons.forEach(button => {
    button.addEventListener("click", () => {
        const applicationId = (button as HTMLButtonElement).dataset.id!;;
        navigateTo(`/applicationDetail/${applicationId}`);
    })
    
});
}
export function  editEmployerProfileEvent(){
    document
        .getElementById('editEmployerProfileForm')
        ?.addEventListener('submit', updateEmployerForm);
}

export function  editJobseekerProfileEvent(){
    document
        .getElementById('editJobseekerProfileForm')
        ?.addEventListener('submit', updateJobseekerForm);
}

// export function updateJobseeker(){
//     document.addEventListener('submit', updateJobseeker);
// }
