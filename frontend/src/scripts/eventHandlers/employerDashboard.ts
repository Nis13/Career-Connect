import { navigateTo } from "./eventHandler";

export function employerDashboardEventListeners(){
    document
.getElementById("applications")
?.addEventListener("click", () => navigateTo('/employerDashboard/viewapplications'));
document
.getElementById("job-post-show")
?.addEventListener("click", () => navigateTo('/employerdashboard/jobposted'));
document
.getElementById("company-profile")
?.addEventListener("click", () => navigateTo('/employerdashboard/companyprofile'));
document
.getElementById("employer-dashboard")
?.addEventListener("click", () => navigateTo('/employerDashboard'));

}