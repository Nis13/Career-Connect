export interface Joblisting{
    title:string,
    createdBy:number,
    jobDescription:string,
    requirements:string,
    benefits:string,
    location:string,
    salaryRange:string,
    jobType:string,
    jobStatus:string
}

export interface Application{
    resume:string,
    coverLetter:Text,
    additionalMessage:Text,
    status:string
}