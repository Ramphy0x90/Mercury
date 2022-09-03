const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    category: { type: Number },
    rating: { type: Number },
    tag: { type: String },
    price: { type: Number, required: true },
    attributes: { type: Schema.Types.Mixed },
    product_nodes: { type: Boolean },
    visible: { type: Boolean, required: true }
});

module.exports = mongoose.model('Product', product);