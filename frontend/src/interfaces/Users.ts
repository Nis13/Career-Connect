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
      companyLogo:string,
      companyLocation:string,
      companyContact:number,
  }