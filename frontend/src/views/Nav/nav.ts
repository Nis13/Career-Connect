import { navigateTo } from "../../scripts/eventHandlers/eventHandler";
import { getrole, getToken } from "../../utils/token";

export function loggedinNav(role:string){
    if (getToken() && getrole()){

      const loginoutBtn = document.getElementById('logout-link');
      if (loginoutBtn) loginoutBtn.style.display = 'block';
      
      const signupBtn = document.getElementById('employer-signup-link');
      if (signupBtn) signupBtn.style.display = 'none';
  const signupBtnJS = document.getElementById('jobseeker-signup-link');
  if (signupBtnJS) signupBtnJS.style.display = 'none';
  const loginBtnJS = document.getElementById('login-link');
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

        const joblisting = document.getElementById('joblisting-link');
        if (joblisting) joblisting.style.display = 'none';  
      }
      else if(role == 'admin'){
        const adminDashboardNav = document.getElementById('admin-dashboard-nav');
        if (adminDashboardNav) adminDashboardNav.style.display = 'block';
      }
    } 
  }

  export function logout(){
    localStorage.clear();
     const loginoutBtn = document.getElementById('logout-link');
     if (loginoutBtn) loginoutBtn.style.display = 'none';

     const signupBtn = document.getElementById('employer-signup-link');
     if (signupBtn) signupBtn.style.display = 'block';

     const signupBtnJS = document.getElementById('jobseeker-signup-link');
     if (signupBtnJS) signupBtnJS.style.display = 'block';

     const loginBtnJS = document.getElementById('login-link');
     if (loginBtnJS)loginBtnJS.style.display = 'block';

     const jobseekerDashboardNav = document.getElementById('jobseeker-dashboard-nav');
      if (jobseekerDashboardNav) jobseekerDashboardNav.style.display = 'none';

    const employerDashboardNav = document.getElementById('employer-dashboard-nav');
    if (employerDashboardNav) employerDashboardNav.style.display = 'none';
    
    const addjob = document.getElementById('add-joblisting-link');
    if (addjob) addjob.style.display = 'none';

    const adminDashboardNav = document.getElementById('admin-dashboard-nav');
    if (adminDashboardNav) adminDashboardNav.style.display = 'none';

    const joblisting = document.getElementById('joblisting-link');
    if (joblisting) joblisting.style.display = 'block'; 

    navigateTo('/');
    }