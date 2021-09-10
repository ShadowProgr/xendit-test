const initRides = require("./ride");
const initHealth = require('./health')

module.exports = (app, db) => {
  const rides = initRides(db)
  const health = initHealth()

  app.use("/rides", rides);
  app.use("/health", health)
  return app;
};
