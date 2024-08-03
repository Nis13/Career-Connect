import { navigateTo } from "../../scripts/eventHandlers/eventHandler";
import { signupemployer } from "../../scripts/services/auth";
import { getToken } from "../../utils/token";
import { showError, validateContactNumber, validateEmail, validatePassword } from "../../utils/validation";



const handleSignupEmployer = async (event: Event) => {
    event.preventDefault();

    document.querySelectorAll('.text-danger').forEach(el => el.textContent = '');

    const name = (document.getElementById("name") as HTMLInputElement).value.trim();
    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const password = (document.getElementById("password") as HTMLInputElement).value.trim();
    const companyDescription = (document.getElementById("companyDescription") as HTMLTextAreaElement).value.trim();
    const companyLogoInput = document.getElementById("companyLogo") as HTMLInputElement;
    const companyLogo = companyLogoInput.files ? companyLogoInput.files[0] : null;
    const companyLocation = (document.getElementById("companyLocation") as HTMLInputElement).value.trim();
    const companyContact = (document.getElementById("companyContact") as HTMLInputElement).value.trim();

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
    if (!companyDescription) {
        showError("companyDescription", "Company Description is required.");
        return;
    }
    if (companyDescription.length > 255) {
      showError("companyDescription", `Company Description must be 255 characters or less.${companyDescription.length}/255 `);
      return;
    }
    if (!companyLocation) {
        showError("companyLocation", "Company Location is required.");
        return;
    }
    if (!companyContact) {
        showError("companyContact", "Company Contact is required.");
        return;
    }
    if (!companyLogo) {
        showError("companyLogo", "Company Logo is required.");
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

    if (!validateContactNumber(companyContact)) {
        showError("companyContact", "Company Contact must be 9 or 10 digits.");
        return;
    }

    if (companyLogo && !['image/jpeg', 'image/png'].includes(companyLogo.type)) {
        showError("companyLogo", "Invalid file type. Only JPEG and PNG are allowed.");
        return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('companyDescription', companyDescription);
    formData.append('companyLogo', companyLogo); 
    formData.append('companyLocation', companyLocation);
    formData.append('companyContactNo', companyContact); 

    try {
        const response = await signupemployer(formData);
        console.log("message:", response.data.message);
        if (response.data.message === "Employer Created successfully") {
            showError("", ""); 
            if (getToken()) {
                navigateTo('/adminDashboard/getallEmployer');
            } else {
                navigateTo('/login');
            }
        }
        else{
            showError("companyContact", response.data.message);
            return;
        }
    } catch (error) {
        console.log("Error during signup:", error);
        showError("", "An error occurred during signup. Please try again.");
    }
};

export default handleSignupEmployer;
