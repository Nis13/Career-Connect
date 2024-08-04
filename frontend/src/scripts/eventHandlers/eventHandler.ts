import { addjoblisting } from "../../views/joblisting/addjoblisting";
import handleLogin from "../../views/login/login";
import handleSignupEmployer from "../../views/SignupEmployer/signup";
import handleSignupJobseeker from "../../views/SignupJobseeker/signup";
import render from "../render";
import { addApplication } from "../../views/application/application";
import { showJoblistingFilter } from "../../views/joblisting/jobfilter";
import {
  editEmployerProfileEvent,
  editJobseekerProfileEvent,
} from "../../views/employerDashboard/employerDashboard";
import { logout } from "../../views/Nav/nav";
import {
  addJobEventListeners
} from "./jobEvents";
import { handleSignupAdmin } from "../../views/adminDashboard/alladmin";
import {
  adminDashboardEventListeners
} from "./adminDashboard";
import { jobseekerDashboardEventListener } from "./jobseekerDashboard";
import { employerDashboardEventListeners } from "./employerDashboard";

let areEventListenersAdded = false;

export const navigateTo = (path: string) => {
  window.history.pushState({}, "", path);
  render(path);
};

export const addEventListeners = () => {
  //job
  addJobEventListeners();

  //admin dashboard
  adminDashboardEventListeners();

  jobseekerDashboardEventListener();

  employerDashboardEventListeners()

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
    .getElementById("job-application-form")
    ?.addEventListener("submit", addApplication);
  document
    .getElementById("filterForm")
    ?.addEventListener("submit", showJoblistingFilter);
  document
    .getElementById("AdminForm")
    ?.addEventListener("submit", handleSignupAdmin);

  editEmployerProfileEvent();
  editJobseekerProfileEvent();

  document
    .getElementById("clear-filter")
    ?.addEventListener("click", () => render(window.location.pathname));

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
    ?.addEventListener("click", () => navigateTo("/joblisting"));

  document
    .getElementById("add-joblisting-link")
    ?.addEventListener("click", () => navigateTo("/addjob"));
  document
    .getElementById("employer-dashboard-nav")
    ?.addEventListener("click", () => navigateTo("/employerDashboard"));
  document
    .getElementById("jobseeker-dashboard-nav")
    ?.addEventListener("click", () => navigateTo("/jobseekerDashboard"));
  document
    .getElementById("admin-dashboard-nav")
    ?.addEventListener("click", () =>
      navigateTo("/adminDashboard/getallEmployer")
    );
  document.getElementById("logout-link")?.addEventListener("click", logout);

  areEventListenersAdded = true;
};




