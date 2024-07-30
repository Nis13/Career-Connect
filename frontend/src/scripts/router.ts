import UniversalRouter from 'universal-router';
import { showJoblisting } from '../views/joblisting/joblisting';
import { joblistingDetail } from '../views/joblisting/joblistingdetail';
import {  jobDetailParam} from '../interfaces/joblisting';
import { getJoblistingform } from '../views/joblisting/updateJoblisting';
import { getapplyform } from '../views/application/application';
import { joblisting} from './services/joblisting';
import { getApplicationById } from '../views/application/viewapplication';

const routes = [
  {
    path: '/',
    action: async () => await fetch('/src/views/home.html').then(response=> response.text()),
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
    path: '/employerDashboard',
    action: async () => await fetch('/src/views/employerDashboard/employerDashboard.html').then(response => response.text()),
  },

  {
    path: '/joblisting',
    action: async () =>{
      const data = await joblisting();

      const response = await showJoblisting(data);
      return response;
    },
  },
  // {
  //   path: '/joblisting/query/:filter',
  //   action: async ({params}:{params:JobFilter}) =>{
  //     console.log(params);
  //     const data = await joblistingFilter(params);
      
  //     const response = await showJoblisting(data);
  //     return response;
  //   },
  // },
  
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
  {
    path:'/seeapplication/:id',
    // action: () => fetch('/src/views/application/application.html').then(response => response.text())
    action: async({params}:{params:jobDetailParam})=> {
      const {id} = params;
      console.log('from nav');
      console.log(id);
      const response = await getApplicationById(parseInt(id!));
      console.log(response);
      return response;
      // return `id of job ${id}`;
    },
  },
];

const router = new UniversalRouter(routes);

export default router;
