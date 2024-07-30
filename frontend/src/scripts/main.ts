import axios from "axios";
import { getrole, getToken, handleToken } from "../utils/token";
import render from "./render";
import { BASE_URL } from "../constants/urls";

document.addEventListener("DOMContentLoaded", async()=>{
  console.log("onload");
  console.log(getToken());
  if (getToken()){
    const token = getToken();
    try{
      const response = await axios.get(`${BASE_URL}/parse/${token}`);

    
    console.log(response);
    handleToken(response.data.id,response.data.role);

    const signupBtn = document.getElementById('employer-signup-link');
    console.log(signupBtn);
    if (signupBtn) {
      signupBtn.style.display = 'none';
    }
    const signupBtnJS = document.getElementById('jobseeker-signup-link');
    console.log(signupBtnJS);
    if (signupBtnJS) {
      signupBtnJS.style.display = 'none';
    }
    const loginBtnJS = document.getElementById('login-link');
    console.log(loginBtnJS);
    if (loginBtnJS) {
      loginBtnJS.style.display = 'none';
    }}
    catch(error){
      console.log(error);
    }

  }

  console.log('no acesss');
  const role = getrole();
  console.log(role);
  if (role == 'employer'){
    const addJob = document.getElementById('add-joblisting-link');
    console.log(addJob);
    if (addJob) {
      addJob.style.display = 'none';
    }
  }
}

)
// Handle navigation
window.addEventListener("popstate", () => {
  render(window.location.pathname);
});

// Initial render
render(window.location.pathname);


