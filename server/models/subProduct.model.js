const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subProduct = new Schema({
    fk_parent: { type: String },
    fk_product: { type: String },
    name: { type: String },
    quantity: { type: Number }
});

module.exports = mongoose.model('SubProduct', subProduct);