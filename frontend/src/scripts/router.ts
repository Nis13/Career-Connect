import UniversalRouter from 'universal-router';
import { showJoblisting, showJoblistingByEmployer } from '../views/joblisting/joblisting';
import { joblistingDetail } from '../views/joblisting/joblistingdetail';
import {  jobDetailParam} from '../interfaces/joblisting';
import { getJoblistingform } from '../views/joblisting/updateJoblisting';
import { getapplyform } from '../views/application/application';
import { joblisting, joblistingByUserId} from './services/joblisting';

import { getApplicationByEmployerId, getApplicationByJobId, getApplicationByJobseekerId, showApplicationByIdS } from './services/application';
import { getrole } from '../utils/token';
import { showApplicationById } from '../views/application/seeapplication';
import { getApplicationforEmployer, getApplicationforJobseeker } from '../views/application/viewapplication';
import { getEmployerDetail } from './services/employer';
import { loadEmployerProfile } from '../views/employerDashboard/profile';
import { getJobseekerDetail } from './services/jobseeker';
import { loadJobseekerProfile } from '../views/jobseekerDashboard/profile';

const routes = [
  {
    path: '/',
    action: async () => 
      await fetch('/src/views/home.html').then(response=> response.text()),
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
    path: '/employerdashboard/viewapplications',
    action: async () => {
      const dashboardHTML = await fetch('/src/views/employerDashboard/employerDashboard.html').then(response => response.text());
      const applications = await getApplicationByEmployerId();
      const applicationsHTML = await getApplicationforEmployer(applications) || '';

      const combinedHTML = dashboardHTML.replace('<div id="content-container"></div>', `<div id="content-container">${applicationsHTML}</div>`);
      return combinedHTML;
    },
  },
  {
    path: '/employerdashboard/jobposted',
    action: async () => {
      const dashboardHTML = await fetch('/src/views/employerDashboard/employerDashboard.html').then(response => response.text());
      const jobData = await joblistingByUserId();
      const applicationsHTML = await showJoblistingByEmployer(jobData) || '';

      const combinedHTML = dashboardHTML.replace('<div id="content-container"></div>', `<div id="content-container">${applicationsHTML}</div>`);
      return combinedHTML;
    },
  },
  {
    path: '/employerdashboard/companyprofile',
    action: async () => {
      const dashboardHTML = await fetch('/src/views/employerDashboard/employerDashboard.html').then(response => response.text());
      const response = await getEmployerDetail();
      console.log(response);
      const applicationsHTML = await loadEmployerProfile(response) || '';
      console.log(applicationsHTML);
      const combinedHTML = dashboardHTML.replace('<div id="content-container"></div>', `<div id="content-container">${applicationsHTML}</div>`);
      return combinedHTML;
    },
  },
  {
    path: '/jobseekerDashboard',
    action: async () => await fetch('/src/views/jobseekerDashboard/jobseekerDashboard.html').then(response => response.text()),
  },
  {
    path: '/jobseekerDashboard/jobseekerprofile',
    action: async () => 
      {
        const dashboardHTML = await fetch('/src/views/jobseekerDashboard/jobseekerDashboard.html').then(response => response.text());
        console.log('job seeker dashboard');
                const response = await getJobseekerDetail();
                console.log(response);
        const profileHTML = await loadJobseekerProfile(response);
        const combinedHTML = dashboardHTML.replace('<div id="jobseeker-content-container"></div>', `<div id="jobseeker-content-container">${profileHTML}</div>`);
        return combinedHTML;
      }
  },
  {
    path: '/jobseekerDashboard/myapplications',
    action: async () => 
      {
        const dashboardHTML = await fetch('/src/views/jobseekerDashboard/jobseekerDashboard.html').then(response => response.text());
        const applications = await getApplicationByJobseekerId();
        console.log("applications for job seeker",applications)
        const applicationHTML = await getApplicationforJobseeker(applications) || '';
        const combinedHTML = dashboardHTML.replace('<div id="jobseeker-content-container"></div>', `<div id="jobseeker-content-container">${applicationHTML}</div>`);
        return combinedHTML;
      }
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
      const role = getrole()
      const response = await joblistingDetail(parseInt(id!),role!);
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
      console.log('from views');
        const data = await getApplicationByJobId(parseInt(id!));
        console.log(data);
      const response = await getApplicationforEmployer(data);
      console.log(response);
      return response;
      // return `id of job ${id}`;
    },
  },
  {
    path:'/applicationdetail/:id',
    // action: () => fetch('/src/views/application/application.html').then(response => response.text())
    action: async({params}:{params:jobDetailParam})=> {
      const {id} = params;
      console.log('from nav');
      console.log(id);
      console.log('from views');
        const data = await showApplicationByIdS(parseInt(id!));
        console.log("Application by ID")
      console.log(data);
      const response = await showApplicationById(data);
      // console.log(response);
      return response;
      // return `id of job ${id}`;
    },
  },
];

const router = new UniversalRouter(routes);

export default router;
