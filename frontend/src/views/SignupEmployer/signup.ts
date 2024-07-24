import { signupemployer } from "../../scripts/services/auth";

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

  export default handleSignupEmployer;