function Ride(db) {
    this.db = db
}
Ride.prototype.save = async function (ride) {
    const sql = 'INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const params = Object.values(ride)
    const connection = this.db

    return new Promise((resolve, reject) => {
        connection.run(sql, params, function (err) {
            if (err) reject(err)
            connection.all('SELECT * FROM Rides WHERE rideID = ?', this.lastID, function (err, rows) {
                if (err) reject(err)
                resolve(rows);
            });
        })
    })
};

Ride.prototype.findAll = async function (paginationObj) {

    let sql = `SELECT * FROM Rides`;
    if (paginationObj.limit) {
        sql += ` LIMIT ${paginationObj.limit}`
        if (paginationObj.page) {
            const offset = paginationObj.limit * (paginationObj.page - 1)
            sql += ` OFFSET ${offset}`
        }
    }


    return new Promise((resolve, reject) => {
        this.db.all(sql, function (err, rows) {
            if (err) reject(err)
            resolve(rows);
        })
    })
};

Ride.prototype.findById = async function (id) {
    const sql = `SELECT * FROM Rides WHERE rideID='${id}'`;

    return new Promise((resolve, reject) => {
        this.db.all(sql, function (err, rows) {
            if (err) reject(err)
            resolve(rows);
        })
    })
};

module.exports = Ride