export interface User{
    id:number,
    name:string,
    email:string,
    password:string,
    role:string,
    contactno:number,
}
export interface Employer extends User{
    companyName: string,
    companyDescription: string,
    companyLogo:string,
    companyLocation:string,
    companyContact:string
}
export interface GetUserQuery{
    q?:string,
    page?:number,
    size?:number
}