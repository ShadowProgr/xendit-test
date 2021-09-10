const RideRepository = require('../repositories/ride')

function Ride(db) {
    this.rideRepository = new RideRepository(db);
}

Ride.prototype.save = async function (ride) {
    return this.rideRepository.save(ride);
};

Ride.prototype.findAll = async function (paginationObj) {
    return this.rideRepository.findAll(paginationObj);
};

Ride.prototype.findById = async function (id) {
    return this.rideRepository.findById(id);
};

module.exports = Ride