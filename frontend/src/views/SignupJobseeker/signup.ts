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

  export default handleSignupJobseeker;