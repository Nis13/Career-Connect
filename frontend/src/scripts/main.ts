import router from "./router";
import { login, signupemployer, signupjobseeker } from "./services/auth";

// Function to render content based on the route
const render = async (pathname: string) => {
  const content = await router.resolve({ pathname });

  if (typeof content !== "string") {
    console.error("Content is not a string");
    return;
  }

  const contentElement = document.getElementById("content");

  if (contentElement) {
    contentElement.innerHTML = content;

    addEventListeners();
  } else {
    console.error("Content element not found");
  }
};

// Function to add event listeners
const addEventListeners = () => {
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
    console.log("Message:", response);
    alert(response.message);
    console.log(response.accessToken);
    storeToken(response.accessToken);
  } catch (error) {
    console.error("Error during login:", error);
  }
};

const handleSignupEmployer = async (event: Event) => {
  event.preventDefault();

  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement)
    .value;
  const companyDescription = (
    document.getElementById("companyDescription") as HTMLTextAreaElement
  ).value;
  const companyLogo = (
    document.getElementById("companyLogo") as HTMLInputElement
  ).value;
  const companyLocation = (
    document.getElementById("companyLocation") as HTMLInputElement
  ).value;
  const companyContact = parseInt(
    (document.getElementById("companyContact") as HTMLInputElement).value,
    10
  );

  if (isNaN(companyContact)) {
    console.error("Invalid company contact number");
    return;
  }
  const employerData = {
    name: name,
    email: email,
    password: password,
    companyDescription: companyDescription,
    companyLogo: companyLogo,
    companyLocation: companyLocation,
    companyContact: companyContact,
  };

  try {
    const response = await signupemployer(employerData);
    console.log("message:", response.data.message);
    alert(response.data.message);
    // navigateTo('/');
  } catch (error) {
    console.error("Error during signup:", error);
  }
};

const handleSignupJobseeker = async (event: Event) => {
  event.preventDefault();

  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement)
    .value;
  const jobseekerEducation = (
    document.getElementById("jobseekerEducation") as HTMLTextAreaElement
  ).value;
  const jobseekerSkills = (
    document.getElementById("jobseekerSkills") as HTMLInputElement
  ).value;
  const jobseekerIndustry = (
    document.getElementById("jobseekerIndustry") as HTMLInputElement
  ).value;
  const jobseekerContact = parseInt(
    (document.getElementById("jobseekerContact") as HTMLInputElement).value,
    10
  );
  const jobseekerResume = (
    document.getElementById("jobseekerResume") as HTMLInputElement
  ).value;

  if (isNaN(jobseekerContact)) {
    console.error("Invalid company contact number");
    return;
  }
  const jobseekerData = {
    name: name,
    email: email,
    password: password,
    jobseekerEducation: jobseekerEducation,
    jobseekerSkills: jobseekerSkills,
    jobseekerIndustry: jobseekerIndustry,
    jobseekerContact: jobseekerContact,
    jobseekerResume: jobseekerResume,
  };

  try {
    const response = await signupjobseeker(jobseekerData);
    console.log("message:", response.data.message);
    alert(response.data.message);
    // navigateTo('/');
  } catch (error) {
    console.error("Error during signup:", error);
  }
};

// Function to store the token in localStorage
const storeToken = (token: string) => {
  localStorage.setItem("token", token);
};

// Handle navigation
window.addEventListener("popstate", () => {
  render(window.location.pathname);
});

// Initial render
render(window.location.pathname);

const navigateTo = (path: string) => {
  window.history.pushState({}, "", path);
  render(path);
};
