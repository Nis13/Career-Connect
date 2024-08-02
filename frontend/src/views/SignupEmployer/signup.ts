import { signupemployer } from "../../scripts/services/auth";

const handleSignupEmployer = async (event: Event) => {
    event.preventDefault();
  
    const formData = new FormData();
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    const companyDescription = (
      document.getElementById("companyDescription") as HTMLTextAreaElement
    ).value;
    const companyLogo = (
      document.getElementById("companyLogo") as HTMLInputElement
    ).files![0];
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
    
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('companyDescription', companyDescription);
    formData.append('companyLogo', companyLogo); 
    formData.append('companyLocation', companyLocation);
    formData.append('companyContact', companyContact.toString()); 
  
    try {
      const response = await signupemployer(formData);
      console.log("message:", response.data.message);
      alert(response.data.message);
      // navigateTo('/');
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  export default handleSignupEmployer;