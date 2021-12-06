const BaseJoi = require('joi')
const sanitizeHtml = require('sanitize-html')

// joi method - sanitize html 
const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        // display if user attempted to include prohibited elements
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    // strict - nothing is allowed
                    allowedTags: [],
                    allowedAttributes: {},
                });
                // check to see if there is a difference 
                if (clean !== value) return helpers.error('string.escapeHTML', {
                    value
                })
                return clean;
            }
        }
    }
});

// extends joi with our extension above
const Joi = BaseJoi.extend(extension)

// create builds schema
module.exports.buildSchema = Joi.object({
    // validate title
    pages: Joi.object({
        title: Joi.string().required().escapeHTML(),
        user: Joi.string().escapeHTML(),
        description: Joi.string().required().escapeHTML(),
        cooling: Joi.string().required().escapeHTML(),
        rgb: Joi.string().required().escapeHTML(),
        motherboard: Joi.string().required().escapeHTML(),
        graphics: Joi.string().required().escapeHTML(),
        storage: Joi.string().required().escapeHTML(),
        memory: Joi.string().required().escapeHTML(),
        image: Joi.string().required().escapeHTML(),
        case: Joi.string().required().escapeHTML(),
        cpu: Joi.string().required().escapeHTML(),
        psu: Joi.string().required().escapeHTML(),
    }).required(),
    deleteImgs: Joi.array()
})

// Comment schema 
module.exports.commentSchema = Joi.object({
    comment: Joi.object({
        body: Joi.string().required().escapeHTML()
    }).required()
})