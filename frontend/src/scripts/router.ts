import UniversalRouter from 'universal-router';
import { showJoblisting, showJoblistingByEmployer } from '../views/joblisting/joblisting';
import { joblistingDetail } from '../views/joblisting/joblistingdetail';
import {  jobDetailParam} from '../interfaces/joblisting';
import { getJoblistingform } from '../views/joblisting/updateJoblisting';
import { getapplyform } from '../views/application/application';
import { joblisting, joblistingByUserId} from './services/joblisting';

import { getallApplications, getApplicationByEmployerId, getApplicationByJobId, getApplicationByJobseekerId, showApplicationByIdS } from './services/application';
import { getrole } from '../utils/token';
import { showApplicationById } from '../views/application/seeapplication';
import { getApplicationforEmployer, getApplicationforJobseeker } from '../views/application/viewapplication';
import { getallEmployer, getEmployerDetail } from './services/employer';
import { loadEmployerDash, loadEmployerProfile } from '../views/employerDashboard/profile';
import { getallJobseeker, getJobseekerDetail } from './services/jobseeker';
import { jobseekerDash, loadJobseekerProfile } from '../views/jobseekerDashboard/profile';
import { displayEmployers } from '../views/adminDashboard/allemployer';
import { displayJobseekers } from '../views/adminDashboard/allJobseeker';
import { getallAdmin } from './services/admin';
import { displayAdmins } from '../views/adminDashboard/alladmin';

const routes = [
  {
    path: '/',
    action: async () => 
      await fetch('/src/views/home.html').then(response=> response.text()),
  },
  {
    path: '/login',
  action: async () => {
    return await fetch('/src/views/login/login.html').then(response => response.text())
  }
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
    action: async () => {
      const dashboardHTML = await fetch('/src/views/employerDashboard/employerDashboard.html').then(response => response.text());
      const HTML = await loadEmployerDash();
      console.log(HTML)
      const combinedHTML = dashboardHTML.replace('<div id="content-container"></div>', `<div id="content-container">${HTML}</div>`);
      return combinedHTML;
    },
  },
  {
    path: '/employerdashboard/viewapplications',
    action: async () => {
      const dashboardHTML = await fetch('/src/views/employerDashboard/employerDashboard.html').then(response => response.text());
      const applications = await getApplicationByEmployerId();
      console.log(applications);
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
    action: async () => {
      const dashboardHTML = await fetch('/src/views/jobseekerDashboard/jobseekerDashboard.html').then(response => response.text());
      const HTML = await jobseekerDash();
      console.log(HTML)
      const combinedHTML = dashboardHTML.replace('<div id="jobseeker-content-container"></div>', `<div id="jobseeker-content-container">${HTML}</div>`);
      return combinedHTML;
    },
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
  // {
  //   path: '/adminDashboard',
  //   action: async () => await fetch('/src/views/adminDashboard/adminDashboard.html').then(response => response.text()),
  // },
  {
    path:  "/signupAdmin",
    action: async () => await fetch('/src/views/adminDashboard/createAdmin.html').then(response => response.text()),
  },
 
  {
    path: '/adminDashboard/getallEmployer',
    action: async () => {
      const sidebarHTML = await fetch('/src/views/adminDashboard/adminDashboard.html').then(response => response.text());

      const data = await getallEmployer();
      const dataHTML = await displayEmployers(data)|| '';
      return sidebarHTML.replace('<div id="admin-content-container"></div>',`<div id="admin-content-container">${dataHTML}</div>`)
    }
  },
  {
    path: '/adminDashboard/getallJobseeker',
    action: async () => {
      const sidebarHTML = await fetch('/src/views/adminDashboard/adminDashboard.html').then(response => response.text());

      const data = await getallJobseeker();
      const dataHTML = await displayJobseekers(data)|| '';
      return sidebarHTML.replace('<div id="admin-content-container"></div>',`<div id="admin-content-container">${dataHTML}</div>`)
    }
  },
  {
    path: '/adminDashboard/getallApplications',
    action: async () => {
      const sidebarHTML = await fetch('/src/views/adminDashboard/adminDashboard.html').then(response => response.text());
      const data = await getallApplications();
      const dataHTML = await getApplicationforEmployer(data) || '';

      return sidebarHTML.replace('<div id="admin-content-container"></div>',`<div id="admin-content-container">${dataHTML}</div>`)      
    },
  },
  {
    path: '/adminDashboard/getallJoblistings',
    action: async () => {
      const sidebarHTML = await fetch('/src/views/adminDashboard/adminDashboard.html').then(response => response.text());
      const data = await joblisting();

      const dataHTML = await showJoblisting(data);

      return sidebarHTML.replace('<div id="admin-content-container"></div>',`<div id="admin-content-container">${dataHTML}</div>`)      
    },
  },
  {
    path: '/adminDashboard/getallAdmin',
    action: async () => {
      const sidebarHTML = await fetch('/src/views/adminDashboard/adminDashboard.html').then(response => response.text());

      const data = await getallAdmin();
      const dataHTML = await displayAdmins(data)|| '';
      return sidebarHTML.replace('<div id="admin-content-container"></div>',`<div id="admin-content-container">${dataHTML}</div>`)
    }
  },

];

const router = new UniversalRouter(routes);

export default router;
