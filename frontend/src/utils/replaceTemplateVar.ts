import { Joblisting, JoblistingDetail } from './../interfaces/joblisting';

export function populateTemplate(template: string, job: (Joblisting | JoblistingDetail)): string {
    // console.log(job);
    template = template
    .replace(/{{title}}/g, job.title)
    .replace(/{{listing_id}}/g, job.listingId.toString())
    .replace(/{{benefits}}/g, job.benefits)
    .replace(/{{requirements}}/g, job.requirements)
    .replace(/{{description}}/g, job.description)
    .replace(/{{location}}/g, job.location)
    .replace(/{{jobStatus}}/g, job.jobStatus)
    .replace(/{{jobType}}/g, job.jobType)
    .replace(/{{salaryRange}}/g, job.salaryRange);
  

        // console.log(job.type);
    if (job.type == 'JoblistingDetail') {
            template = template
                .replace(/{{company_name}}/g, job.name)
                .replace(/{{company_logo}}/g, job.logo);
            console.log('additinonal edit');
        }
    return template;

}