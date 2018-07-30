let Car = require('../../../app/api/car/car.model');

// Car model test
describe('Car', function () {
    beforeEach(function (done) {
        Car.remove(done); // remove all data
    });

    it('should not create without make', function (done) {
        Car.create({
            model: "Merc",
        }, function (err) {
            err.should.not.be.empty;
            done();
        });
    });

    it('should not create without model', function (done) {
        Car.create({
            make: "Merc",
        }, function (err) {
            err.should.not.be.empty;
            done();
        });
    });

    it('should save a model and make', function (done) {
        Car.create({
            make: "2010",
            model: "Merc",
            color: "Green"
        }, carShouldHave('model', 'Merc', done));
    });
});

function carShouldHave(name, value, done) {
    return function (err) {
        if (err) done(err);

        Car.findOne({}, function (err, car) {
            if (err) done(err);
            car.should.have.property(name, value);
            done();
        });
    }
}