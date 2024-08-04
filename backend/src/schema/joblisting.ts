import Joi from "joi";

export const createJobBodySchema = Joi.object({
    title: Joi.string().required().messages({
        'any.required':"title is required",
    }),

    jobDescription: Joi.string().required().messages({
        "any.required": "Job Description is required",
    }),

    requirements: Joi.string().required().messages({
        "any.required": "Requirements is required",
    }),

    benefits: Joi.string().required().messages({
        "any.required": "benefits is required",
    }),

    location: Joi.string().required().messages({
        "any.required": "location is required",
    }),


    salaryRange: Joi.string().required().messages({
        "any.required": "Salary range is required",
    }),
        jobType: Joi.string()
        .valid('Full-Time', 'Part-Time', 'Internship', 'Contract')
        .required()
        .messages({
            'any.required': 'Job Type is required',
            'string.base': 'Job Type must be a string',
            'string.empty': 'Job Type cannot be empty',
            'any.only': 'Job Type must be  Full-time,Part-time,Contract or Internship'
        }),
}).options({
    stripUnknown:true,
})