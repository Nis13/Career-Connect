
export interface Joblisting {
    type: 'Joblisting';
    listingId: string;
    title: string;
    createdBy: number;
    description: string;
    requirements: string;
    benefits: string;
    location: string;
    salaryRange: string;
    jobType: string;
    jobStatus: string;
}
export interface addJoblisting {
    title: string;
    jobDescription: string;
    requirements: string;
    benefits: string;
    location: string;
    salaryRange: string;
    jobType: string;
}export interface updateJoblisting extends addJoblisting {
   listingId:number
}

export interface JoblistingDetail extends Omit<Joblisting, 'type'> {
    type: 'JoblistingDetail';
    name: string;
    logo: string;
}

export interface jobDetailParam{
      id?: string;
  }

  export interface JobFilter{
    companyName?:string,
    Location?:string,
    jobType?:string,
    title?:string,
    jobStatus?:string
}