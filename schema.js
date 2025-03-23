const joi=require("joi")

module.exports.listingSchema=joi.object({
    listing:joi.object({
        title:joi.string().required(),
        description:joi.string().required(),
        location:joi.string().required(),
        country:joi.string().required(),
        price:joi.number().required().min(0),
        image:joi.string().allow("",null),
        category:joi.string().required()
    }).required()//it indicate that therre must be a listing object refers to joi and required and what are the parameters in it
})

module.exports.reviewSchema=joi.object({
    review:joi.object({
        rating:joi.number().min(1).max(5),
        comment:joi.string().required()
    }).required()
})

