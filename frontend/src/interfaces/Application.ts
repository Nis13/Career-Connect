

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
    coverLetter:string,
    applicationId:string
}