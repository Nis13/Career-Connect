import { navigateTo } from "../../scripts/eventHandlers/eventHandler";
import { login } from "../../scripts/services/auth";
import {storeToken} from "../../utils/token";
import { loggedinNav } from "../Nav/nav";

const handleLogin = async (event: Event) => {
    event.preventDefault();

    (document.getElementById('emailError') as HTMLElement).textContent = '';
    (document.getElementById('passwordError') as HTMLElement).textContent = '';
    const email = (document.getElementById("login-email") as HTMLInputElement)
      .value;
    const password = (
      document.getElementById("login-password") as HTMLInputElement
    ).value;
    
    if (!email || !validateEmail(email)) {
      (document.getElementById('emailError') as HTMLElement).textContent = 'Please enter a valid email address.';
      return ;
  }
    if (!password) {
      (document.getElementById('passwordError') as HTMLElement).textContent = 'Password is required.';
      return;
    }
  
    try {
      const response = await login({ email, password });
      // alert(response.message);
      if (response.message == "User Logged in Successfully!") {
        storeToken(response.accessToken);
        localStorage.setItem('role',response.role);
        loggedinNav(response.role);
        if (response.role == "employer") {window.history.replaceState({}, '', '/employerDashboard'); navigateTo('/employerDashboard')}
        else if(response.role == "jobseeker") navigateTo('/jobseekerDashboard');
        else if (response.role == "admin") {window.history.replaceState({}, '', '/adminDashboard/getallEmployer'); navigateTo('/adminDashboard/getallEmployer')}; 
      }
      else{
        (document.getElementById('passwordError') as HTMLElement).textContent = response.message;
        return;
      }
      
      
    } catch (error) {
      console.log("Error during login:", error);
    }
  };
  export default handleLogin;

  function validateEmail(email:string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}