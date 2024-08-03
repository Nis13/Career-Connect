import { getToken } from './../../utils/token';
import { navigateTo } from "../../scripts/eventHandlers/eventHandler";
import { signupjobseeker } from "../../scripts/services/auth";
import { showError, validateContactNumber, validateEmail, validatePassword, validatePDFFile } from '../../utils/validation';

const handleSignupJobseeker = async (event: Event) => {
    event.preventDefault();

    document.querySelectorAll('.text-danger').forEach(el => el.textContent = '');
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
      (document.getElementById("jobseekerContact") as HTMLInputElement).value);
    const jobseekerResume = (
      document.getElementById("jobseekerResume") as HTMLInputElement
    ).files![0];

    if (!name) {
      showError("name", "Name is required.");
      return;
  }
  if (!email) {
      showError("email", "Email is required.");
      return;
  }
  if (!password) {
      showError("password", "Password is required.");
      return;
  }
  if (!jobseekerEducation) {
    showError("jobseekerEducation", "Education is required.");
    return;
}
if (!jobseekerSkills) {
  showError("jobseekerSkills", "Skill is required.");
  return;
}
if (!jobseekerIndustry) {
  showError("jobseekerIndustry", "Industry is required.");
  return;
}
if (!jobseekerContact) {
  showError("jobseekerContact", "Contact is required.");
  return;
}
if (!jobseekerResume) {
  showError("jobseekerResume", "IResume is required.");
  return;
}
if (!validateEmail(email)) {
  showError("email", "Invalid email format.");
  return;
}

if (!validatePassword(password)) {
  showError("password", "Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one digit, and one special character.");
  return;
}

if (!validateContactNumber(jobseekerContact.toString())) {
  showError("jobseekerContact", "Company Contact must be 9 or 10 digits.");
  return;
}
if (!validatePDFFile(jobseekerResume)) {
  showError("jobseekerResume", "Resume must be pdf ");
  return;
}
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('jobseekerEducation', jobseekerEducation);
    formData.append('jobseekerSkills', jobseekerSkills);
    formData.append('jobseekerIndustry', jobseekerIndustry);
    formData.append('contactNo', jobseekerContact.toString());
    formData.append('resume', jobseekerResume);
  
    try {
      const response = await signupjobseeker(formData);
      console.log("message:", response.data.message);
      alert(response.data.message);
      if (response.data.message == "Jobseeker created Successfully") {
        if (getToken()) navigateTo('/adminDashboard/getallJobseeker')
          else navigateTo('/login');
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  export default handleSignupJobseeker;