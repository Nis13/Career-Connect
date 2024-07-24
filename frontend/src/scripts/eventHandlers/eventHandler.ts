import handleLogin from "../../views/login/login";
import handleSignupEmployer from "../../views/SignupEmployer/signup";
import handleSignupJobseeker from "../../views/SignupJobseeker/signup";
import render from "../render";

// Function to add event listeners
export const addEventListeners = () => {
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
  };

 export const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    render(path);
  };