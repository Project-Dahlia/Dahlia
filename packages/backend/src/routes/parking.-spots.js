const express = require('express');
const router = express.Router();
const parkingController = require('../controller/park-controller');

router.get('/parking-spots', parkingController.findAll);

router.get('/parking-spots/:id', parkingController.findOne);

router.put('/parking-spots/:id', parkingController.updateSpot);

router.delete('/parking-spots/:id', parkingController.deleteOne);

router.get('/parking-spots/ttc', parkingController.locTtc);

module.exports = router;
