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
    companyContactNo:number,
}

export interface Jobseeker extends User{
    jobseekerEducation:string,
    jobseekerSkills:string,
    jobseekerIndustry:string,
    contactNo:number,
    jobseekerResume:string
}
export interface GetUserQuery{
    q?:string,
    page?:number,
    size?:number
}
export interface Jobseekerup extends User{
    education:string,
    skills:string,
    industry:string,
    contactNo:number
}