var express = require("express");
var router = express.Router();

module.exports = () => {
    router.get('/', (req, res) => res.send('Healthy'))
    return router
};
