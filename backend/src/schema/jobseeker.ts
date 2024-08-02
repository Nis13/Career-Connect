import Joi from "joi";

export const createJobseekerBodySchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required':"Name is required",
    }),

    email: Joi.string().email().required().messages({
        "any.required": "Email is required",
        "string.email":"Email must be valid format"
    }),

    password: Joi.string().required().min(8).messages({
        'any.required':'Password is required',
        'string.min':"Password must be atleast 8 character long",
        'password.uppercase':'Password must have at least one uppercase character',
        'password.lowercase':'Password must have at least one lowercase character',
        'password.special':'Password must have at least one special character'
    }).custom((value,helpers)=>{
        if (!/[A-Z]/.test(value)){
            return helpers.error('password.uppercase')
        }
        if (!/[a-z]/.test(value)){
            return helpers.error('password.lowercase')
        }
        if (!/[!@#$%&]/.test(value)){
            return helpers.error('password.special')
        }

        return value;
    }),
    
    jobseekerEducation:Joi.string().required().messages({
        'any.required':'Education is required'
    }),

    jobseekerSkills:Joi.string().required().messages({
        'any.required':'Skill is required'
    }),
    jobseekerIndustry:Joi.string().required().messages({
        'any.required':'Industry is required'
    }),

    jobseekerResume:Joi.string().required().messages({
        'any.required':'Resume is required'
    }),

    jobseekerContact:Joi.number().required().min(100000000).messages({
        'any.required':'Contact number is required',
        "number.base":"Contact number must be a number",
        "number.min":"Enter valid contact number"
    })

}).options({
    stripUnknown:true,
})
