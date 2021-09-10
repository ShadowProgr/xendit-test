const Joi = require('joi');

const rideSchema = Joi.object({
    startLatitude: Joi.number().min(-90).max(90).required(),
    startLongitude: Joi.number().min(-180).max(180).required(),
    endLatitude: Joi.number().min(-90).max(90).required(),
    endLongitude: Joi.number().min(-180).max(180).required(),
    riderName: Joi.string().required(),
    driverName: Joi.string().required(),
    driverVehicle: Joi.string().required(),
})

module.exports = Object.freeze({ rideSchema })