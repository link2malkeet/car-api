'use strict';

/* globals sinon, describe, expect, it */
var sinon = require('sinon');
var chai = require('chai');
chai.use(require('sinon-chai'));
var proxyquire = require('proxyquire').noPreserveCache();

var carCtrlStub = {
    getCars: 'carCtrl.getCars',
    postCar: 'carCtrl.postCar',
    getCar: 'carCtrl.getCar',
    deleteCar: 'carCtrl.deleteCar',
    updateCar: 'carCtrl.updateCar'
};

var routerStub = {
    get: sinon.spy(),
    put: sinon.spy(),
    patch: sinon.spy(),
    post: sinon.spy(),
    delete: sinon.spy()
};

// require the index with our stubbed out modules
var carIndex = proxyquire('../../../app/api/car/index.js', {
    express: {
        Router() {
            return routerStub;
        }
    },
    './car.controller': carCtrlStub
});

describe('Car API Router:', function () {
    it('should return an express router instance', function () {
        carIndex.should.equal(routerStub);
    });

    describe('GET /', function () {
        it('should route to car.controller.getCars', function () {
            routerStub.get
                .withArgs('/', 'carCtrl.getCars')
                .should.have.been.calledOnce;
        });
    });

    describe('GET /:id', function () {
        it('should route to car.controller.getCar', function () {
            routerStub.get
                .withArgs('/:id', 'carCtrl.getCar')
                .should.have.been.calledOnce;
        });
    });

    describe('POST /', function () {
        it('should route to car.controller.postCar', function () {
            routerStub.post
                .withArgs('/', 'carCtrl.postCar')
                .should.have.been.calledOnce;
        });
    });

    describe('PUT /:id', function () {
        it('should route to car.controller.updateCar', function () {
            routerStub.put
                .withArgs('/:id', 'carCtrl.updateCar')
                .should.have.been.calledOnce;
        });
    });

    describe('DELETE /:id', function () {
        it('should route to car.controller.deleteCar', function () {
            routerStub.delete
                .withArgs('/:id', 'carCtrl.deleteCar')
                .should.have.been.calledOnce;
        });
    });
});
