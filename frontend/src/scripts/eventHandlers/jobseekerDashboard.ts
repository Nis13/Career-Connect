import { navigateTo } from "./eventHandler";

export function jobseekerDashboardEventListener() {
  document
    .getElementById("jobseeker-dashboard")
    ?.addEventListener("click", () => navigateTo("/jobseekerDashboard"));

  document
    .getElementById("jobseeker-applications")
    ?.addEventListener("click", () =>
      navigateTo("/jobseekerDashboard/myapplications")
    );
  document
    .getElementById("jobseeker-profile")
    ?.addEventListener("click", () =>
      navigateTo("/jobseekerDashboard/jobseekerprofile")
    );
}
