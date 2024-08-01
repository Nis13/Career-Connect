import { addjoblisting } from "../../views/joblisting/addjoblisting";
import { updateJoblisting } from "../../views/joblisting/updateJoblisting";
import handleLogin from "../../views/login/login";
import handleSignupEmployer from "../../views/SignupEmployer/signup";
import handleSignupJobseeker from "../../views/SignupJobseeker/signup";
import render from "../render";
import { addApplication } from "../../views/application/application";
import { showJoblistingFilter } from "../../views/joblisting/jobfilter";
import { handleChangeStatus } from "../services/application";
import { editProfileEvent, viewJob, viewUser} from "../../views/employerDashboard/employerDashboard";
import { getrole, getToken } from "../../utils/token";

let areEventListenersAdded = false;

export const addEventListeners =  () => {
 addJobTileEventListeners();
 updateJoblistingEventListeners();
 applyJobEventListener();
 seeJobApplication();
changeStatus();
seeJobApplication();
            changeStatus();
            viewJob();
            viewUser();
            editProfileEvent()

            // document
            // .getElementById('editUserProfileForm')
            // ?.addEventListener('submit', );


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

  //  document
  //  .getElementById('editEmployerProfileForm')
  //  ?.addEventListener('submit', updateEmployerForm);
  
   

   document
    .getElementById("updateJobForm")
    ?.addEventListener("submit", (event: Event) => {
      event.preventDefault();
        const target = event.currentTarget as HTMLElement;
        console.log("target");
        console.log(target);
        if (target && target.dataset.id) {
          const jobId = target.dataset.id;
          console.log(jobId);
          updateJoblisting(parseInt(jobId));
          // console.log(`/updatejob/${jobId}`);
          // navigateTo(`/updatejob/${jobId}`);
        }
      });
  
      // document
      // .getElementById("employerDashboard")
      // ?.addEventListener("click", () => navigateTo('/employerDashboard'));
      

        // Jobseeker
// document
// .getElementById("jobseeker-dashboard")
// ?.addEventListener("click", () => navigateTo('/employerDashboard'));
// document
// .getElementById("see-jobs")
// ?.addEventListener("click", () => loadContentJobseeker('job-postings'));
document
.getElementById("jobseeker-applications")
?.addEventListener("click", () => navigateTo('/jobseekerDashboard/myapplications'));
document
.getElementById("jobseeker-profile")
?.addEventListener("click", () => navigateTo('/jobseekerDashboard/jobseekerprofile'));
      
  
// Employer Dashboard
// document
// .getElementById("dashboard")
// ?.addEventListener("click", () => loadContent('dashboard'));
// document
// .getElementById("applications")
// ?.addEventListener("click", () => loadContent('applications'));
// document
// .getElementById("job-post-show")
// ?.addEventListener("click", () => loadContent('job-postings'));
// document
// .getElementById("company-profile")
// ?.addEventListener("click", () => loadContent('company-profile'));

// document
// .getElementById("dashboard")
// ?.addEventListener("click", () => navigateTo('/employerDashboard'));
document
.getElementById("applications")
?.addEventListener("click", () => navigateTo('/employerDashboard/viewapplications'));
document
.getElementById("job-post-show")
?.addEventListener("click", () => navigateTo('/employerdashboard/jobposted'));
document
.getElementById("company-profile")
?.addEventListener("click", () => navigateTo('/employerdashboard/companyprofile'));



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
      .getElementById("logout-link")
      ?.addEventListener("click", logout);

    
      areEventListenersAdded = true;
  };

 export const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    render(path);
  };

 // Function to add event listeners to job tiles
 export function addJobTileEventListeners() {
  // console.log("add event");
  const jobTiles = document.querySelectorAll('.job_tile');
  // console.log(jobTiles);
  
  jobTiles.forEach(tile => {
    tile?.addEventListener('click', (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      // console.log(target);
      if (target && target.dataset.id) {
        const jobId = target.dataset.id;
        // console.log(`/jobdetail/${jobId}`);
        navigateTo(`/jobdetail/${jobId}`);
      }
    });
  });
}

export function updateJoblistingEventListeners() {
  // console.log("add event");
  const jobEditBtn = document.getElementById("job-edit-btn")!;
  console.log(jobEditBtn);
  
    jobEditBtn?.addEventListener('click', (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      console.log("target");
      console.log(target);
      if (target && target.dataset.id) {
        const jobId = target.dataset.id;
        console.log(jobId);
        console.log(`/updatejob/${jobId}`);
        navigateTo(`/updatejob/${jobId}`);
      }
    });
  }
  export function applyJobEventListener(){
    const applyBtn = document.getElementById("job-apply-btn");
    console.log(applyBtn);
    applyBtn?.addEventListener('click', (event:Event)=>{
      const target = event.currentTarget as HTMLElement;
      if (target && target.dataset.id) {
        const jobId = target.dataset.id;
        console.log(jobId);
        if(getToken()){
          console.log(`/applyjob/${jobId}`);
          navigateTo(`/applyjob/${jobId}`);
        }else{
          navigateTo('/login');

        }
      }
    });
    }

  export function saveJobUpdateEventListeners() {
    // console.log("add event");
    const jobSaveBtn = document.getElementById("save-job-update")!;

    console.log(jobSaveBtn);
    
    }

    export function seeJobApplication(){
      const seeApplicationBtn = document.getElementById('see-application-btn');
      seeApplicationBtn?.addEventListener('click', (event:Event) =>{
        const target = event.currentTarget as HTMLElement;
      if (target && target.dataset.id) {
        const jobId = target.dataset.id;
        console.log(jobId);
        console.log(`/seeApplication/${jobId}`);
        navigateTo(`/seeApplication/${jobId}`);
      }
      })
    }

    export function changeStatus(){

      document.querySelectorAll('#change-status-btn').forEach(button => {
        button.addEventListener('click', async () => {
            const applicationId = (button as HTMLButtonElement).dataset.id!;
            const status = (document.getElementById(`status-select-${applicationId}`) as HTMLSelectElement).value;
            handleChangeStatus(parseInt(applicationId),status);
            console.log(status);
            navigateTo('/employerdashboard/viewapplications');
        })})
    }
  
    function logout(){
    localStorage.clear();
     console.log('from logout');
     const loginoutBtn = document.getElementById('logout-link');
     if (loginoutBtn) loginoutBtn.style.display = 'none';
     const signupBtn = document.getElementById('employer-signup-link');
     if (signupBtn) signupBtn.style.display = 'block';
     const signupBtnJS = document.getElementById('jobseeker-signup-link');
     console.log(signupBtnJS);
     if (signupBtnJS) signupBtnJS.style.display = 'block';
     const loginBtnJS = document.getElementById('login-link');
     console.log(loginBtnJS);
     if (loginBtnJS)loginBtnJS.style.display = 'block';
     const jobseekerDashboardNav = document.getElementById('jobseeker-dashboard-nav');
      if (jobseekerDashboardNav) jobseekerDashboardNav.style.display = 'none';
          const employerDashboardNav = document.getElementById('employer-dashboard-nav');
          if (employerDashboardNav) employerDashboardNav.style.display = 'none';
          const addjob = document.getElementById('add-joblisting-link');
          if (addjob) addjob.style.display = 'none';
     navigateTo('/');
    }
    export function loggedinNav(role:string){
      if (getToken() || getrole()){
        // const role = getrole();
        const loginoutBtn = document.getElementById('logout-link');
    if (loginoutBtn) loginoutBtn.style.display = 'block';
    const signupBtn = document.getElementById('employer-signup-link');
    if (signupBtn) signupBtn.style.display = 'none';
    const signupBtnJS = document.getElementById('jobseeker-signup-link');
    console.log(signupBtnJS);
    if (signupBtnJS) signupBtnJS.style.display = 'none';
    const loginBtnJS = document.getElementById('login-link');
    console.log(loginBtnJS);
    if (loginBtnJS)loginBtnJS.style.display = 'none';
        if (role == 'jobseeker'){

          const jobseekerDashboardNav = document.getElementById('jobseeker-dashboard-nav');
          if (jobseekerDashboardNav) jobseekerDashboardNav.style.display = 'block';
          const  joblisting = document.getElementById("joblisting-link");
          if (joblisting) joblisting.style.display = 'block';
          

        }
        else if (role == 'employer'){
          const employerDashboardNav = document.getElementById('employer-dashboard-nav');
          if (employerDashboardNav) employerDashboardNav.style.display = 'block';
      
          const addjob = document.getElementById('add-joblisting-link');
          if (addjob) addjob.style.display = 'block';
          
        }
      } 
    }