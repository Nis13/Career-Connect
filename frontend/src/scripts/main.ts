import axios from "axios";
import { getrole, getToken, handleToken } from "../utils/token";
import render from "./render";
import { BASE_URL } from "../constants/urls";
import { navigateTo } from "./eventHandlers/eventHandler";


// document.addEventListener('DOMContentLoaded', () => {
//     const userRole = getrole();
//     if(userRole) loadNavigation(userRole);
// });

export function loadNav(){
  if(getToken()){
    const loginoutBtn = document.getElementById('logout-link');
    if (loginoutBtn) loginoutBtn.style.display = 'block';
    const signupBtn = document.getElementById('employer-signup-link');
    if (signupBtn) signupBtn.style.display = 'none';
    const signupBtnJS = document.getElementById('jobseeker-signup-link');
    console.log(signupBtnJS);
    if (signupBtnJS) signupBtnJS.style.display = 'none';
    const loginBtnJS = document.getElementById('login-link');
    console.log(loginBtnJS);
    if (loginBtnJS)loginBtnJS.style.display = 'none'
  }
  
  const role = getrole();
  console.log(role);
  if (role == 'jobseeker'){

    const jobseekerDashboardNav = document.getElementById('jobseeker-dashboard-nav');
    if (jobseekerDashboardNav) jobseekerDashboardNav.style.display = 'block';
  }
  else if (role == 'employer'){
    const employerDashboardNav = document.getElementById('employer-dashboard-nav');
    if (employerDashboardNav) employerDashboardNav.style.display = 'block';

    const addjob = document.getElementById('add-joblisting-link');
    if (addjob) addjob.style.display = 'block';
    
  }
}
export async function saveData(token:string){
  try{
    const response = await axios.get(`${BASE_URL}/parse/${token}`);

  
  console.log(response);
  handleToken(response.data.id,response.data.role);
}
catch(error){
  console.log(error);
}
}
document.addEventListener("DOMContentLoaded", async()=>{
  console.log("onload");
  console.log(getToken());
  if (getToken()){
    // const imageUrl = await getEmployerImage();
    // const imgElement = document.getElementById('employer-image') as HTMLImageElement;
    // imgElement.src = imageUrl;
    

    
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
   

  }
  else{
    navigateTo('/login');
  }

  console.log('no acesss');
  const role = getrole();
  console.log(role);
  if (role == 'jobseeker'){

    const jobseekerDashboardNav = document.getElementById('jobseeker-dashboard-nav');
    if (jobseekerDashboardNav) jobseekerDashboardNav.style.display = 'block';
  }
  else if (role == 'employer'){
    const employerDashboardNav = document.getElementById('employer-dashboard-nav');
    if (employerDashboardNav) employerDashboardNav.style.display = 'block';

    const addjob = document.getElementById('add-joblisting-link');
    if (addjob) addjob.style.display = 'block';
    
  }
}

)
// Handle navigation
window.addEventListener("popstate", () => {
  render(window.location.pathname);
});



// Initial render
// render('/');
render(window.location.pathname);


 