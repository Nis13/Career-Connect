import { addjoblisting } from "../../views/joblisting/addjoblisting";
import handleLogin from "../../views/login/login";
import handleSignupEmployer from "../../views/SignupEmployer/signup";
import handleSignupJobseeker from "../../views/SignupJobseeker/signup";
import render from "../render";
import { addApplication } from "../../views/application/application";
import { showJoblistingFilter } from "../../views/joblisting/jobfilter";
import { handleChangeStatus } from "../services/application";
import { editEmployerProfileEvent, editJobseekerProfileEvent, updateJobseeker, viewJob, viewUser} from "../../views/employerDashboard/employerDashboard";
import { getrole} from "../../utils/token";
import { logout } from "../../views/Nav/nav";
import { addJobTileEventListeners, applyJobEventListener, seeJobApplication, updateJobForm, updateJoblistingEventListeners } from "./jobEvents";
import { deleteUser } from "../services/jobseeker";

let areEventListenersAdded = false;

export const addEventListeners =  () => {
  //job 
  addJobTileEventListeners();
  updateJoblistingEventListeners();
  applyJobEventListener();
  updateJobForm();

  seeJobApplication();
  changeStatus();

  //admin dashboard
  viewJob();
  viewUser();
  updateJobseeker();


  editEmployerProfileEvent();
  editJobseekerProfileEvent();

  document
      .getElementById("admin-create-jobseeker")
      ?.addEventListener("click", () => navigateTo("/signupjobseeker"));
      document
      .getElementById("admin-create-employer")
      ?.addEventListener("click", () => navigateTo("/signupEmployer"));

 

            

 document
      .getElementById("employer-signup-link-login")
      ?.addEventListener("click", () => navigateTo("/signupemployer"));
    document
      .getElementById("jobseeker-signup-link-login")
      ?.addEventListener("click", () => navigateTo("/signupjobseeker"));
 document
   .getElementById("login-form")
   ?.addEventListener("submit", handleLogin);
 document
   .getElementById("employerForm")
   ?.addEventListener("submit", handleSignupEmployer);
 document
   .getElementById("jobseekerForm")
   ?.addEventListener("submit", handleSignupJobseeker);
   document
   .getElementById("addJobForm")
   ?.addEventListener("submit", addjoblisting);
   document
   .getElementById('job-application-form')
   ?.addEventListener("submit", addApplication);
   document
   .getElementById('filterForm')
   ?.addEventListener('submit',showJoblistingFilter);
 
  
      

        // Jobseeker
// document
// .getElementById("jobseeker-dashboard")
// ?.addEventListener("click", () => navigateTo('/employerDashboard'));
document
.getElementById("jobseeker-applications")
?.addEventListener("click", () => navigateTo('/jobseekerDashboard/myapplications'));
document
.getElementById("jobseeker-profile")
?.addEventListener("click", () => navigateTo('/jobseekerDashboard/jobseekerprofile'));
      
  
// Employer Dashboard
document
.getElementById("applications")
?.addEventListener("click", () => navigateTo('/employerDashboard/viewapplications'));
document
.getElementById("job-post-show")
?.addEventListener("click", () => navigateTo('/employerdashboard/jobposted'));
document
.getElementById("company-profile")
?.addEventListener("click", () => navigateTo('/employerdashboard/companyprofile'));

//admin Dashboard
document
.getElementById("admin-dashboard")
?.addEventListener("click", () => navigateTo('/adminDashboard'));
document
.getElementById("view-employers")
?.addEventListener("click", () => navigateTo('/adminDashboard/getallEmployer'));
document
.getElementById("view-jobseekers")
?.addEventListener("click", () => navigateTo('/adminDashboard/getallJobseeker'));
document
.getElementById("view-applications")
?.addEventListener("click", () => navigateTo('/adminDashboard/getallApplications'));
document
.getElementById("view-joblistings")
?.addEventListener("click", () => navigateTo('/adminDashboard/getallJoblistings'));

deleteUserEvent();


if (areEventListenersAdded) return;
    document
      .getElementById("login-link")
      ?.addEventListener("click", () => navigateTo("/login"));
    document
      .getElementById("employer-signup-link")
      ?.addEventListener("click", () => navigateTo("/signupemployer"));
    document
      .getElementById("jobseeker-signup-link")
      ?.addEventListener("click", () => navigateTo("/signupjobseeker"));
    document
      .getElementById("home-link")
      ?.addEventListener("click", () => navigateTo("/"));
    document
      .getElementById("joblisting-link")
      ?.addEventListener("click", () => navigateTo('/joblisting'));

      document
      .getElementById("add-joblisting-link")
      ?.addEventListener("click", () => navigateTo('/addjob'));
      document
      .getElementById("employer-dashboard-nav")
      ?.addEventListener("click", () => navigateTo('/employerDashboard'));
      document
      .getElementById("jobseeker-dashboard-nav")
      ?.addEventListener("click", () => navigateTo('/jobseekerDashboard'));
      document
      .getElementById("admin-dashboard-nav")
      ?.addEventListener("click", () => navigateTo('/adminDashboard'));
      document
      .getElementById("logout-link")
      ?.addEventListener("click", logout);

    
      areEventListenersAdded = true;
  };

 export const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    render(path);
  };


 

 // Function to add event listeners to job tiles
 //joblisting 
 export function deleteUserEvent() {
  const userDeleteBtn = document.querySelectorAll(".admin-delete-jobseeker" || ".admin-delete-employer")!;
  
    userDeleteBtn?.forEach(button => button.addEventListener('click', (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      if (target && target.dataset.id) {
        const userId = target.dataset.id;
        console.log(userId);
        deleteUser(parseInt(userId!));
        navigateTo(window.location.pathname);
      }
    }));
  }


  


   

    export function changeStatus(){

      document.querySelectorAll('#change-status-btn').forEach(button => {
        button.addEventListener('click', async () => {
            const applicationId = (button as HTMLButtonElement).dataset.id!;
            const status = (document.getElementById(`status-select-${applicationId}`) as HTMLSelectElement).value;
            handleChangeStatus(parseInt(applicationId),status);
            const role = getrole();
            if (role == 'employer')navigateTo('/employerdashboard/viewapplications');
            if (role == 'admin')navigateTo('/adminDashboard/getallApplications');
        })})
    }
  
    


  