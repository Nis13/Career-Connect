import UniversalRouter from 'universal-router';
import { showJoblisting } from '../views/joblisting/joblisting';
import { joblistingDetail } from '../views/joblisting/joblistingdetail';
import {  jobDetailParam } from '../interfaces/joblisting';
import { addJobTileEventListeners } from './eventHandlers/eventHandler';

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
    path: '/jobdetail/:id',
    // action: async () => 'home'
    action: async({params}:{params:jobDetailParam})=> {
      const {id} = params;
      const response = await joblistingDetail(parseInt(id!));
      return response;
      // return `id of job ${id}`;
    },
    // async(context:JobDetailContext) =>{
    //   const { id } = context.params;
    //   const response = await joblistingDetail(id);
    //   return response;
    // }
  }
];

const router = new UniversalRouter(routes);

export default router;
