import Context from 'universal-router';
export interface Joblisting{
    listingId:string,
    title:string,
    createdBy:number,
    description:string,
    requirements:string,
    benefits:string,
    location:string,
    salaryRange:string,
    jobType:string,
    jobStatus:string
}

export interface jobDetailParam{
      id?: string;
  }