import { ApplicationList, employerViewApplication } from '../interfaces/Application';
import { getEmployer, getJobseeker } from '../interfaces/Users';
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

export function populateApplicationTemplate(template: string, application: (employerViewApplication)){
    template = template
    .replace(/{{listing_id}}/g, application.jobId!.toString())
    .replace(/{{name}}/g, application.name)
    .replace(/{{company_name}}/g, application.jobStatus)
    .replace(/{{applicationStatus}}/g, application.applicationStatus)
    .replace(/{{application_id}}/g, application.applicationId)
    .replace(/{{email}}/g, application.email)
    .replace(/{{contact}}/g, application.contactNo)
    


    return template;
}
export function populateEmployerTemplate(template: string, employer: (getEmployer)){
    template = template
    .replace(/{{employerName}}/g, employer.name)
    .replace(/{{employerEmail}}/g, employer.email)
    .replace(/{{employercontactNo}}/g, employer.contactNo)
    .replace(/{{employerLocation}}/g, employer.location)
    .replace(/{{employerDescription}}/g, employer.description)
    .replace(/{{employerLogo}}/g, employer.logo)

    return template;
}
export function populateJobseekerTemplate(template: string, jobseeker: (getJobseeker)){
    template = template
    .replace(/{{userName}}/g, jobseeker.name)
    .replace(/{{userEmail}}/g, jobseeker.email)
    .replace(/{{userContactNo}}/g, jobseeker.contactNo.toString())
    .replace(/{{userResume}}/g, jobseeker.resume)
    .replace(/{{userEducation}}/g, jobseeker.education)
    .replace(/{{userSkills}}/g, jobseeker.skills)
    .replace(/{{userIndustry}}/g, jobseeker.industry)

    return template;
}