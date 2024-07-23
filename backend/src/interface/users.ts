export interface User{
    id:number,
    name:string,
    email:string,
    password:string,
    role:string
}
export interface Employer extends User{
    companyDescription: string,
    companyLogo:string,
    companyLocation:string,
    companyContact:number,
}

export interface Jobseeker extends User{
    jobseekerEducation:string,
    jobseekerSkills:string,
    jobseekerIndustry:string,
    jobseekerContact:number,
    jobseekerResume:string
}
export interface GetUserQuery{
    q?:string,
    page?:number,
    size?:number
}