export const validateEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};

export const validatePassword = (password: string): boolean => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
};

export const validateContactNumber = (contact: string): boolean => {
    const contactPattern = /^\d{9,10}$/;
    return contactPattern.test(contact);
};

export const validateFile = (file: File | null): boolean => {
    return file ? ['image/jpeg', 'image/png'].includes(file.type) : false;
};

export const validatePDFFile = (file: File | null): boolean => {
    return file ? file.type === 'application/pdf' : false;
};

export const showError = (fieldId: string, message: string) => {
    const errorContainer = document.getElementById(`${fieldId}-error`);
    if (errorContainer) {
        errorContainer.textContent = message;
        errorContainer.style.display = 'block';
    }
};