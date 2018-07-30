'use strict';

var express = require('express');
var carController = require('./car.controller');

var router = express.Router();

router.get('/', carController.getCars);
router.get('/:id', carController.getCar);
router.post('/', carController.postCar);
router.put('/:id', carController.updateCar);
router.delete('/:id', carController.deleteCar);

module.exports = router;
