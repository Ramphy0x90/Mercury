const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attribute = new Schema({
    color: { type: String },
    material: { type: String },
    weight: { type: Number },
    width: { type: Number },
    height: { type: Number }
});

module.exports = mongoose.model('Attribute', attribute);