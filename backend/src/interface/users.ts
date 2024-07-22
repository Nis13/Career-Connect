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
    seekerid:number,
    education:string,
    skills:string,
    industry:string,
    contactno:number
}
export interface GetUserQuery{
    q?:string,
    page?:number,
    size?:number
}