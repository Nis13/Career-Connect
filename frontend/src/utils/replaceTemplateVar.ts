import { ApplicationList } from '../interfaces/Application';
import { Joblisting, JoblistingDetail } from './../interfaces/joblisting';

export function populateTemplate(template: string, job: (JoblistingDetail)): string {
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
    .replace(/{{salaryRange}}/g, job.salaryRange)
    .replace(/{{company_name}}/g, job.name)
    .replace(/{{company_logo}}/g, job.logo);;
  

        // console.log(job.type);
    if (job.type == 'JoblistingDetail') {
            template = template
                .replace(/{{company_name}}/g, job.name)
                .replace(/{{company_logo}}/g, job.logo);
            console.log('additinonal edit');
        }
    return template;

}

export function populateApplicationTemplate(template: string, application: (ApplicationList)){
    template = template
    .replace(/{{listing_id}}/g, application.jobId!.toString())
    .replace(/{{name}}/g, application.name!)
    .replace(/{{company_name}}/g, application.jobStatus!)
    .replace(/{{applicationStatus}}/g, application.applicationStatus)
    .replace(/{{coverLetter}}/g, application.coverLetter)
    .replace(/{{application_id}}/g, application.applicationId)

    return template;
}