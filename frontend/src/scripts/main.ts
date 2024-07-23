// frontend/src/scripts/main.ts

import axios from 'axios';
import router from './router';
import { login, signup } from './services/auth';

// Function to render content based on the route
const render = async (pathname: string) => {
  const content = await router.resolve({ pathname });

  if (typeof content !== 'string') {
    console.error('Content is not a string');
    return;
  }

  const contentElement = document.getElementById('content');

  if (contentElement) {
    contentElement.innerHTML = content;

    addEventListeners();
  } else {
    console.error('Content element not found');
  }
};

// Function to add event listeners
const addEventListeners = () => {
  document.getElementById('login-form')?.addEventListener('submit', handleLogin);
  document.getElementById('employerForm')?.addEventListener('submit', handleSignup);
  document.getElementById('login-link')?.addEventListener('click', () => navigateTo('/login'));
  document.getElementById('signup-link')?.addEventListener('click', () => navigateTo('/signup'));
  document.getElementById('home-link')?.addEventListener('click', () => navigateTo('/'));
};

// Function to handle login form submission
const handleLogin = async (event: Event) => {
  event.preventDefault();
  const email = (document.getElementById('login-email') as HTMLInputElement).value;
  const password = (document.getElementById('login-password') as HTMLInputElement).value;

  try {
    const response = await login({ email, password });
    console.log('Message:', response);
    alert(response.message)
    console.log(response.accessToken);
    storeToken(response.accessToken); 
  } catch (error) {
    console.error('Error during login:', error);
  }
};


const handleSignup = async (event: Event) => {
    event.preventDefault(); 
  
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const companyDescription = (document.getElementById('companyDescription') as HTMLTextAreaElement).value;
    const companyLogo = (document.getElementById('companyLogo') as HTMLInputElement).value;
    const companyLocation = (document.getElementById('companyLocation') as HTMLInputElement).value;
    const companyContact = parseInt((document.getElementById('companyContact') as HTMLInputElement).value, 10);
  
    if (isNaN(companyContact)) {
      console.error('Invalid company contact number');
      return;
    }
    const employerData = {
      name:name,
      email:email,
      password:password,
      companyDescription:companyDescription,
      companyLogo:companyLogo,
      companyLocation:companyLocation,
      companyContact:companyContact
    };
  
    try {
      const response = await signup(employerData);
      console.log('message:', response.data.message);
      alert(response.data.message)
      // navigateTo('/');
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

// Function to store the token in localStorage
const storeToken = (token: string) => {
  localStorage.setItem('token', token);
};

// Handle navigation
window.addEventListener('popstate', () => {
  render(window.location.pathname);
});

// Initial render
render(window.location.pathname);

const navigateTo = (path: string) => {
  window.history.pushState({}, '', path);
  render(path);
};
