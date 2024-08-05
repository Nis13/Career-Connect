import {
  viewJob,
  viewUser,
} from "../../views/employerDashboard/employerDashboard";
import { deleteUser } from "../services/jobseeker";
import { navigateTo } from "./eventHandler";

export function deleteAdminEvent() {
  const userDeleteBtn = document.querySelectorAll(".admin-delete-admin")!;

  userDeleteBtn?.forEach((button) =>
    button.addEventListener("click", (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      if (target && target.dataset.id) {
        const userId = target.dataset.id;
        deleteUser(parseInt(userId!));
        navigateTo(window.location.pathname);
      }
    })
  );
}

export function deleteUserEvent() {
  const userDeleteBtn = document.querySelectorAll(
    ".admin-delete-jobseeker" ||
      ".admin-delete-employer" ||
      ".admin-delete-admin"
  )!;

  userDeleteBtn?.forEach((button) =>
    button.addEventListener("click", (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      if (target && target.dataset.id) {
        const userId = target.dataset.id;
        deleteUser(parseInt(userId!));
        navigateTo(window.location.pathname);
      }
    })
  );
}

export function adminDashboardEventListeners() {
  document
    .getElementById("view-employers")
    ?.addEventListener("click", () =>
      navigateTo("/adminDashboard/getallEmployer")
    );
  document
    .getElementById("view-jobseekers")
    ?.addEventListener("click", () =>
      navigateTo("/adminDashboard/getallJobseeker")
    );
  document
    .getElementById("view-applications")
    ?.addEventListener("click", () =>
      navigateTo("/adminDashboard/getallApplications")
    );
  document
    .getElementById("view-joblistings")
    ?.addEventListener("click", () =>
      navigateTo("/adminDashboard/getallJoblistings")
    );
  document
    .getElementById("view-admins")
    ?.addEventListener("click", () =>
      navigateTo("/adminDashboard/getallAdmin")
    );

  deleteUserEvent();
  viewJob();
  viewUser();
  deleteAdminEvent();

  document
    .getElementById("admin-create-jobseeker")
    ?.addEventListener("click", () => navigateTo("/signupjobseeker"));
  document
    .getElementById("admin-create-employer")
    ?.addEventListener("click", () => navigateTo("/signupEmployer"));
  document
    .getElementById("admin-create-admin")
    ?.addEventListener("click", () => navigateTo("/signupAdmin"));
}
