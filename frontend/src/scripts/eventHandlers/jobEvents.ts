import { getrole, getToken } from "../../utils/token";
import { updateJoblisting } from "../../views/joblisting/updateJoblisting";
import { handleChangeStatus } from "../services/application";
import { navigateTo } from "./eventHandler";

export function seeJobApplication(){
    const seeApplicationBtn = document.getElementById('see-application-btn');
    seeApplicationBtn?.addEventListener('click', (event:Event) =>{
      const target = event.currentTarget as HTMLElement;
    if (target && target.dataset.id) {
      const jobId = target.dataset.id;
      navigateTo(`/seeApplication/${jobId}`);
    }
    })
  }

  export function applyJobEventListener(){
    const applyBtn = document.getElementById("job-apply-btn");
    applyBtn?.addEventListener('click', (event:Event)=>{
      const target = event.currentTarget as HTMLElement;
      if (target && target.dataset.id) {
        const jobId = target.dataset.id;
        if(getToken()){
          navigateTo(`/applyjob/${jobId}`);
        }else{
          navigateTo('/login');

        }
      }
    });
    }

    export function updateJoblistingEventListeners() {
        const jobEditBtn = document.getElementById("job-edit-btn")!;
        
          jobEditBtn?.addEventListener('click', (event: Event) => {
            const target = event.currentTarget as HTMLElement;
            if (target && target.dataset.id) {
              const jobId = target.dataset.id;
              navigateTo(`/updatejob/${jobId}`);
            }
          });
        }

        export function addJobTileEventListeners() {
            const jobTiles = document.querySelectorAll('.job_tile');
            jobTiles.forEach(tile => {
              tile?.addEventListener('click', (event: Event) => {
                const target = event.currentTarget as HTMLElement;
                if (target && target.dataset.id) {
                  const jobId = target.dataset.id;
                  navigateTo(`/jobdetail/${jobId}`);
                }
              });
            });
          }

          export function updateJobForm(){
            document
            .getElementById("updateJobForm")
            ?.addEventListener("submit", (event: Event) => {
              event.preventDefault();
                const target = event.currentTarget as HTMLElement;
                if (target && target.dataset.id) {
                  const jobId = target.dataset.id;
                  updateJoblisting(parseInt(jobId));
                }
              });
          }

          export function changeStatus(){

            document.querySelectorAll('#change-status-btn').forEach(button => {
              button.addEventListener('click', async () => {
                  const applicationId = (button as HTMLButtonElement).dataset.id!;
                  const status = (document.getElementById(`status-select-${applicationId}`) as HTMLSelectElement).value;
                  handleChangeStatus(parseInt(applicationId),status);
                  const role = getrole();
                  if (role == 'employer')navigateTo('/employerdashboard/viewapplications');
                  if (role == 'admin')navigateTo('/adminDashboard/getallApplications');
              })})
          }

export function addJobEventListeners(){
  addJobTileEventListeners();
  updateJoblistingEventListeners();
  seeJobApplication();
  applyJobEventListener();
  updateJobForm();
  changeStatus();
}