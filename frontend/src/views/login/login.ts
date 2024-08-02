import { loggedinNav, navigateTo } from "../../scripts/eventHandlers/eventHandler";
import { login } from "../../scripts/services/auth";
import {storeToken} from "../../utils/token";

// Function to handle login form submission
const handleLogin = async (event: Event) => {
    event.preventDefault();
    const email = (document.getElementById("login-email") as HTMLInputElement)
      .value;
    const password = (
      document.getElementById("login-password") as HTMLInputElement
    ).value;
  
    try {
      const response = await login({ email, password });
      console.log("Message:", response.message);
      alert(response.message);
      if (response.message) {
        localStorage.setItem('role',response.role);
        loggedinNav(response.role);
        if (response.role == "employer") navigateTo('/employerDashboard');
        else if(response.role == "jobseeker") navigateTo('/jobseekerDashboard');
        else if (response.role == "admin") navigateTo('/adminDashboard'); 
      };
      storeToken(response.accessToken);
      
    } catch (error) {
      console.log("Error during login:", error);
    }
  };
  export default handleLogin;