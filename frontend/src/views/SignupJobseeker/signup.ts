import { getToken } from './../../utils/token';
import { navigateTo } from "../../scripts/eventHandlers/eventHandler";
import { signupjobseeker } from "../../scripts/services/auth";

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
    ).files![0];
  
    if (isNaN(jobseekerContact)) {
      console.error("Invalid company contact number");
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