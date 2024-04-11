'use strict';

// import requirement modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const swaggerDocs = require('./swagger-ui/swagger');

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//v1 api routes
app.use('/api/v1', routes);

// sawgger ui docs
swaggerDocs(app);

module.exports = app;
