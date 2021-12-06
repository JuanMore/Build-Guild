const Joi = require('joi')

// create builds schema
module.exports.buildSchema = Joi.object({
    // validate title
    pages: Joi.object({
        title: Joi.string().required(),
        user: Joi.string(),
        description: Joi.string().required(),
        cooling: Joi.string().required(),
        rgb: Joi.string().required(),
        motherboard: Joi.string().required(),
        graphics: Joi.string().required(),
        storage: Joi.string().required(),
        memory: Joi.string().required(),
        image: Joi.string().required(),
        case: Joi.string().required(),
        cpu: Joi.string().required(),
        psu: Joi.string().required(),
    }).required(),
    deleteImgs: Joi.array()
})

// Comment schema 
module.exports.commentSchema = Joi.object({
    comment: Joi.object({
        body: Joi.string().required()
    }).required()
})