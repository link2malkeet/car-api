/**
 * GET     /car              ->  get
 * POST    /car              ->  create
 * GET     /car/:id          ->  get one
 * PUT     /car/:id          ->  update
 * DELETE  /car/:id          ->  delete
 */

const mongoose = require('mongoose');
const Car = require('./car.model');

function respondWithResult(res, statusCode, message) {
    statusCode = statusCode || 200;
    return function (entity) {
        if (entity) {
            return res.status(statusCode).json(entity);
        }
        return null;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        res.status(statusCode).send(err);
    };
}

function patchUpdates(patches) {
    return function (entity) {
        return Object.assign(entity, patches).save();
    };
}

function handleEntityNotFound(res) {
    return function (entity) {
        console.log(entity);
        if (!entity) {
            res.status(404).send({
                message: "Car not found"
            });
            return null;
        }
        return entity;
    };
}

function removeEntity(res) {
    return function (entity) {
        if (entity) {
            return entity.remove()
                .then(() => res.status(204).end());
        }
    };
}

/*
 * to retrieve all the cars.
 */
function getCars(req, res) {
    return Car.find({}).exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

/*
 * to retrieve a car given its id.
 */
function getCar(req, res) {
    return Car.findById({ _id: req.params.id }).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

/*
 * save a new car.
 */
function postCar(req, res) {
    return Car.create(req.body)
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

/*
 * delete a car given its id.
 */
function deleteCar(req, res) {
    return Car.findById({ _id: req.params.id }).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}

/*
 * update a car given its id
 */
function updateCar(req, res) {
    return Car.findById({ _id: req.params.id }).exec()
        .then(handleEntityNotFound(res))
        .then(patchUpdates(req.body))
        .then(respondWithResult(res, 204))
        .catch(handleError(res));
}

//export all the functions
module.exports = { getCars, postCar, getCar, deleteCar, updateCar };