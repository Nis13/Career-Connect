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

export interface UserUpdate {
    name?: string;
    email?: string;
}

export interface EmployerUpdate {
    company_description?: string;
    location?: string;
    employer_contact_no?: number;
}

export interface updateJobseeker{
    name?:string, 
    email?:string, 
    contact_no?:number,  
    education?:string,
    skills?:string,
    industry?:string
}