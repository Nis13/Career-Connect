import { Joblisting } from "../interface/joblisting";
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
            createdBy:employerId.employerId
        };
        await this.queryBuilder()
        .update(jobToUpdate)
        .table("job_listings")
        .where('listing_id', listing_id);

        return {message:"job updated successfully"};
    }


    static async getJoblistings(){
        const query = await this.queryBuilder().select('*').table('job_listings');
        return query;
    }
    // static async count(filter:GetUserQuery){
    //     const { q } = filter;

    //     const query = this.queryBuilder()
    //     .count("*")
    //     .table("users")
    //     .first();
        
    //     if (q){
    //         query.whereLike("name",`%${q}%`);
    //     }

    //     return query;
    // }
    static async getJoblistingByEmployerId(employerId:number){
        const query = this.queryBuilder().select('*').from("job_listings").where("created_by",employerId).first();
        const respone = await query;
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
};