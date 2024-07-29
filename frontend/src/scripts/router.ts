import UniversalRouter from 'universal-router';
import { showJoblisting } from '../views/joblisting/joblisting';
import { joblistingDetail } from '../views/joblisting/joblistingdetail';
import {  jobDetailParam } from '../interfaces/joblisting';
import { getJoblistingform } from '../views/joblisting/updateJoblisting';
import { getapplyform } from '../views/application/application';

const routes = [
  {
    path: '/',
    action: async () => 'home sweet home',
  },
  {
    path: '/login',
  action: async () => await fetch('/src/views/login/login.html').then(response => response.text())
  },
  {
    path: '/signupemployer',
    action: async () => await fetch('/src/views/SignupEmployer/signup.html').then(response => response.text()),
  },
  {
    path: '/signupjobseeker',
    action: async () => await fetch('/src/views/SignupJobseeker/signup.html').then(response => response.text()),
  },
  {
    path: '/joblisting',
    action: async () =>{
      const response = await showJoblisting();
      return response;
    },
  },
  {
    path: '/addjob',
    action: async () => await fetch('/src/views/joblisting/addjoblisting.html').then(response => response.text()),
  },
  {
    path: '/jobdetail/:id',
    // action: async () => 'home'
    action: async({params}:{params:jobDetailParam})=> {
      const {id} = params;
      const response = await joblistingDetail(parseInt(id!));
      return response;
      // return `id of job ${id}`;
    },
  },
  {
    path:'/updatejob/:id',
    action: async({params}:{params:jobDetailParam})=> {
      const {id} = params;
      const response = await getJoblistingform(parseInt(id!));
      return response;
      // return `id of job ${id}`;
    },
  },
  {
    path:'/applyjob/:id',
    // action: () => fetch('/src/views/application/application.html').then(response => response.text())
    action: async({params}:{params:jobDetailParam})=> {
      const {id} = params;
      const response = await getapplyform(id!);
      return response;
      // return `id of job ${id}`;
    },
  },
];

const router = new UniversalRouter(routes);

export default router;
