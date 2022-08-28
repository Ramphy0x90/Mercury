const model = require('../models/product.model');

class Product {
    static async getProduct(id) {
        let product = await model.findOne({_id: id});

        return product;
    }

    static async getProducts() {
        let products = await model.find({visible: true});

        return products;
    }

    static async getAllProducts() {
        let products = await model.find();

        return products;
    }

    static async getProductsByFilter() {
        let products = await model.find();

        return products;
    }

    static async insert(product) {
        delete product['_id'];
        await model.create(product);
    }

    static async update(product) {
        await model.findByIdAndUpdate({_id: product['_id']}, product, {new: true});
    }

    static async delete(id) {
        await model.findByIdAndDelete({_id: id});
    }
}

module.exports = Product;