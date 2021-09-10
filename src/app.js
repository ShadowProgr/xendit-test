'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const initController = require('./controllers')
const logger = require('./utils/logger');

module.exports = (db) => {
    app.use(bodyParser.json());
    initController(app, db)

    return app;
};
