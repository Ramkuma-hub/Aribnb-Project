import Joi from "joi";


export const listschema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.string().min(0).required(),
    image: Joi.string().allow(""),
    location: Joi.string().required(),
    country: Joi.string().required(),
   
});

export const reviewSchema = Joi.object({
    review:Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        comment: Joi.string().required()
       
    }).required()
});
