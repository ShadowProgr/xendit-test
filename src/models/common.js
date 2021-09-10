const Joi = require('joi');

const paginationSchema = Joi.object({
    limit: Joi.number().min(0).optional(),
    page: Joi.number().min(1).optional(),
})

module.exports = Object.freeze({ paginationSchema })