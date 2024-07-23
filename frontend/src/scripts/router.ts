
// frontend/src/scripts/router.ts

import UniversalRouter from 'universal-router';
const routes = [
  {
    path: '/',
    action: async () => 'home sweet home',
  },
  {
    path: '/login',
  action: async () => fetch('/src/views/login/login.html').then(response => response.text())
  },
  {
    path: '/signupemployer',
    action: async () => fetch('/src/views/SignupEmployer/signup.html').then(response => response.text()),
  },
  {
    path: '/signupjobseeker',
    action: async () => fetch('/src/views/SignupJobseeker/signup.html').then(response => response.text()),
  },
];

const router = new UniversalRouter(routes);

export default router;
