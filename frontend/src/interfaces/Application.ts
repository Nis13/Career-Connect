

export interface Application{
    resume:string,
    coverLetter:string,
    additionalMessage?:string
}

export interface ApplicationList{
    jobId?:number,
    name?:string,
    jobStatus?:string
    applicationStatus:string,
    // coverLetter:string,
    applicationId:string
}

export interface employerViewApplication{
    jobId:number,
    name:string,
    email:string,
    applicationStatus:string,
    applicationId:string,
    contactNo:string,
    jobStatus:string
}