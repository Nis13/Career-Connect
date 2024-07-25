import handleLogin from "../../views/login/login";
import handleSignupEmployer from "../../views/SignupEmployer/signup";
import handleSignupJobseeker from "../../views/SignupJobseeker/signup";
import render from "../render";

let areEventListenersAdded = false;
// Function to add event listeners

export const addEventListeners = () => {
 addJobTileEventListeners();
 updateJoblistingEventListeners()
 document
   .getElementById("login-form")
   ?.addEventListener("submit", handleLogin);
 document
   .getElementById("employerForm")
   ?.addEventListener("submit", handleSignupEmployer);
 document
   .getElementById("jobseekerForm")
   ?.addEventListener("submit", handleSignupJobseeker);

    // updateJoblistingEventListeners();
  
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