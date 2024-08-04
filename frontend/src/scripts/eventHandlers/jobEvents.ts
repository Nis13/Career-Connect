import { getToken } from "../../utils/token";
import { updateJoblisting } from "../../views/joblisting/updateJoblisting";
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
                  // console.log(`/updatejob/${jobId}`);
                  // navigateTo(`/updatejob/${jobId}`);
                }
              });
          }