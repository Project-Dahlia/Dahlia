const express = require('express');
const homeRoute = require('./home-route');
const authRoute = require('./auth-route');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());

const defaultRoutes = [
  {
    path: '/',
    route: homeRoute
  },
  {
    path: '/test',
    route: homeRoute
  },
  {
    path: '/auth',
    route: authRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
