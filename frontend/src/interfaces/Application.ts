export interface Application{
    applicationResume:string,
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
    jobId:string,
    title:string,
    name:string,
    email:string,
    applicationStatus:string,
    applicationId:string,
    contactNo:string,
    jobStatus:string
}