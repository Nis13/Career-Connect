import { joblistingById } from '../../scripts/services/joblistingdetail';
import { populateTemplate } from "../../utils/replaceTemplateVar";

export const joblistingDetail =  async (listing_id:number,userRole:string) =>{
  try {
    const data = await joblistingById(listing_id);
    data.type = 'JoblistingDetail';
    const htmlFile = await fetch('/src/views/joblisting/joblistingdetail.html').then(response => response.text());
    const btnHtml = getButtons(userRole);
    const htmlString = populateTemplate(htmlFile+btnHtml, data);
    const addedHtmlString = htmlString;
    return addedHtmlString;
  } catch (error) {
    console.log("Error during listing:", error);
  }
}

function getButtons(userRole:string){
if(userRole == 'employer') {
  return `<div class=" mb-3">
                        <p class="btn btn-secondary ms-2 job-edit-btn" id="job-edit-btn" data-id="{{listing_id}}">Edit</p>
                        <p class="btn see-application-btn" id="see-application-btn" data-id="{{listing_id}}">See Applications</p>
                    </div> </div>
            </div>
        </div>
    </div>
</div>
</div>
</div>`
}
else if (userRole == 'admin'){
  return `<div class=" mb-3">
                        <p class="btn btn-secondary ms-2 job-edit-btn" id="job-edit-btn" data-id="{{listing_id}}">Edit</p>
                    </div> </div>
            </div>
        </div>
    </div>
</div>
</div>
</div>`
}
else{
  return `<div class=" mb-3">
                        <p class="btn apply-btn" id="job-apply-btn" data-id="{{listing_id}}">Apply Now</p>
                        </div> </div>
            </div>
        </div>
    </div>
</div>
</div>
</div>`
}
}