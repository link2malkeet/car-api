//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
let Car = require('../../../app/api/car/car.model');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Cars', () => {
    beforeEach((done) => { //Before each test we empty the database
        Car.remove({}, (err) => {
            done();
        });
    });
    /*
     * Test the /GET route
    */
    describe('/GET car', () => {
        it('it should GET all the cars', (done) => {
            chai.request(server)
                .get('/car')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    /*
    * Test the /GET/:id route
    */
    describe('/GET/:id car', () => {
        it('it should GET a car by the given id', (done) => {
            let car = new Car({
                make: "2010",
                model: "Merc",
                color: "Green"
            });
            car.save((err, car) => {
                chai.request(server)
                    .get('/car/' + car.id)
                    .send(car)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('make');
                        res.body.should.have.property('model');
                        res.body.should.have.property('color');
                        res.body.should.have.property('_id').eql(car.id);
                        done();
                    });
            });
        });
    });

    /*
    * Test the /POST route
    */
    describe('/POST car', () => {
        it('it should not POST a car without make field', (done) => {
            let car = {
                model: "Merc",
            }
            chai.request(server)
                .post('/car')
                .send(car)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.errors.make.should.have.property('kind').eql('required');
                    done();
                });
        });
        it('it should POST a car ', (done) => {
            let car = {
                make: "2010",
                model: "Merc",
                color: "Green"
            }
            chai.request(server)
                .post('/car')
                .send(car)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    /*
    * Test the /PUT/:id route
    */
    describe('/PUT/:id car', () => {
        it('it should UPDATE a car given the id', (done) => {
            let car = new Car({
                make: "2010",
                model: "Merc",
                color: "Green"
            })
            car.save((err, car) => {
                chai.request(server)
                    .put('/car/' + car.id)
                    .send({
                        color: "Red"
                    })
                    .end((err, res) => {
                        res.should.have.status(204);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        });
    });
    /*
    * Test the /DELETE/:id route
    */
    describe('/DELETE/:id car', () => {
        it('it should DELETE a car given the id', (done) => {
            let car = new Car({
                make: "2010",
                model: "Merc",
                color: "Green"
            })
            car.save((err, car) => {
                chai.request(server)
                    .delete('/car/' + car.id)
                    .end((err, res) => {
                        res.should.have.status(204);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        });

    });

});