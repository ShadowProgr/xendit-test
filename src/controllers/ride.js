const express = require("express");
const Joi = require("joi");
const rideRouter = express.Router();
const { rideSchema } = require('../models/rides')
const { paginationSchema } = require('../models/common')
const RideService = require('../services/ride');
const logger = require("../utils/logger");

module.exports = (db) => {
    const rideService = new RideService(db)
    rideRouter.post('/', async (req, res) => {
        const startLatitude = Number(req.body.start_lat);
        const startLongitude = Number(req.body.start_long);
        const endLatitude = Number(req.body.end_lat);
        const endLongitude = Number(req.body.end_long);
        const riderName = req.body.rider_name;
        const driverName = req.body.driver_name;
        const driverVehicle = req.body.driver_vehicle;

        try {
            const rideObj = await rideSchema.validateAsync({ startLatitude, startLongitude, endLatitude, endLongitude, riderName, driverName, driverVehicle });
            const result = await rideService.save(rideObj)
            res.send(result)
        } catch (err) {
            logger.error(err)
            if (Joi.isError(err)) {
                res.send(({
                    error_code: 'VALIDATION_ERROR',
                    message: err
                }))
            }
            return res.send({
                error_code: 'SERVER_ERROR',
                message: 'Unknown error'
            });
        }
    });

    rideRouter.get('/', async (req, res) => {
        try {
            const limit = req.query.limit
            const page = req.query.page
            const validatedPagination = await paginationSchema.validateAsync({ limit, page });
            const result = await rideService.findAll(validatedPagination)
            if (result.length === 0) {
                return res.send({
                    error_code: 'RIDES_NOT_FOUND_ERROR',
                    message: 'Could not find any rides'
                });
            }
            res.send(result);
        } catch (err) {
            logger.error(err)
            if (Joi.isError(err)) {
                res.send(({
                    error_code: 'VALIDATION_ERROR',
                    message: err
                }))
            }
            return res.send({
                error_code: 'SERVER_ERROR',
                message: 'Unknown error'
            });
        }
    });

    rideRouter.get('/:id', async (req, res) => {
        try {
            const result = await rideService.findById(req.params.id)
            if (result.length === 0) {
                return res.send({
                    error_code: 'RIDES_NOT_FOUND_ERROR',
                    message: 'Could not find any rides'
                });
            }
            res.send(result);
        } catch (err) {
            logger.error(err)

            return res.send({
                error_code: 'SERVER_ERROR',
                message: 'Unknown error'
            });
        }
    });

    return rideRouter
};
