export interface UserCredentials {
    email: string;
    password: string;
  }
  
  export interface User{
  
      name:string,
      email:string,
      password:string
  }
  export interface Employer extends User{
      companyDescription: string,
      companyLogo:File,
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