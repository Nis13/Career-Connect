import { GetJobQuery, Joblisting } from "../interface/joblisting";
import { BaseModel } from "./base";



export class JoblistingModel extends BaseModel {

    static async createJoblisting(userId:number,joblisting:Joblisting){
        const employerId = await this.queryBuilder().select('employer_id').from("employer").where('user_id',userId).first();
        const jobToCreate = {
            title:joblisting.title,
            description:joblisting.jobDescription,
            requirements:joblisting.requirements,
            benefits:joblisting.benefits,
            location:joblisting.location,
            salaryRange:joblisting.salaryRange,
            jobType:joblisting.jobType,
            jobStatus:joblisting.jobStatus,
            createdBy:employerId.employerId
        };

        await this.queryBuilder()
        .insert(jobToCreate)
        .table("job_listings");

        
    
    // const createdUser = await this.queryBuilder()
    //     .select('user_id', 'email', 'name')
    //     .table("users")
    //     .where("email", employer.email)
    //     .first();

    return {message:"job Created successfully"};

    }

    static async updateJoblistingById(userId:number,listing_id:number, joblisting:Joblisting){
        const employerId = await this.queryBuilder().select('employer_id').from("employer").where('user_id',userId).first();
        const jobToUpdate = {
            title:joblisting.title,
            description:joblisting.jobDescription,
            requirements:joblisting.requirements,
            benefits:joblisting.benefits,
            location:joblisting.location,
            salaryRange:joblisting.salaryRange,
            jobType:joblisting.jobType,
            jobStatus:joblisting.jobStatus,
            updatedBy: userId
        };
        await this.queryBuilder()
        .update(jobToUpdate)
        .table("job_listings")
        .where('listing_id', listing_id);

        return {message:"job updated successfully"};
    }


    static async getJoblistings(){
        const query = await this.queryBuilder().select('*').table('job_listings').innerJoin("employer",{ "employer.employer_id": "job_listings.created_by" })
        .innerJoin("users",{"employer.user_id":"users.user_id"});
        return query;
    }
    static async getJoblistingByUserId(userId:number){
        console.log(userId);
        const query = this.queryBuilder()
        .select('*')
        .table('job_listings')
        .innerJoin('employer', 'job_listings.created_by', 'employer.employer_id')
        .innerJoin('users', 'employer.user_id', 'users.user_id')
        .where('users.user_id', userId);        const respone = await query;
        return respone;
    }
    static async getJoblistingById(id:number){
        const query = this.queryBuilder()
        // .select('*')
        .select('listingId','title','job_listings.description','requirements','benefits','job_listings.location','salaryRange','jobType','jobStatus','name','logo')
        .from("job_listings")
        .innerJoin("employer",{ "employer.employer_id": "job_listings.created_by" })
        .innerJoin("users",{"employer.user_id":"users.user_id"})
        .where("listing_id",id).first();
        const respone = await query;
        return respone;
    }

    static async deleteJoblistingById(id: number) {
        await this.queryBuilder().from("job_listings").where('listing_id', id).delete();
        return { message: 'User deleted successfully' };
    }

    static async getJobListingByFilter(filter:GetJobQuery){
        // .select('*')
        const query = this.queryBuilder().select('*').table('job_listings').innerJoin("employer",{ "employer.employer_id": "job_listings.created_by" })
        .innerJoin("users",{"employer.user_id":"users.user_id"});

        if (filter.title){
            query.where("job_listings.title","ilike",`%${filter.title}`);
        }

        if(filter.location){
            query.where("job_listings.location","ilike",`%${filter.location}`);
        }

        if(filter.jobType){
            query.where("job_listings.jobType","ilike",`%${filter.jobType}`);
        }

        if(filter.name){
            query.where("users.name","ilike",`%${filter.name}`);
        }
        if (filter.jobStatus){
            query.where("job_listings.title","ilike",`%${filter.jobStatus}`);
        }

        const data = await query;

        return data;

    }
};