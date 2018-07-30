let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CarSchema = new Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    color: { type: String },
});

module.exports = mongoose.model('car', CarSchema);