const model = require('../models/product.model');
const modelAttribute = require('../models/attribute.model');
const modelSubProduct = require('../models/subProduct.model');

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
        return await model.create(product);
    }

    static async update(product) {
        return await model.findByIdAndUpdate({_id: product['_id']}, product, {new: true});
    }

    static async delete(id) {
        await model.findByIdAndDelete({_id: id});
    }

    static async getAttribute(id) {
        let attribute = await modelAttribute.findOne({_id: id});

        return attribute;
    }

    static async insertAttribute(attribute) {
        delete attribute['_id'];
        return await modelAttribute.create(attribute);
    }

    static async updateAttribute(attribute) {
        return await modelAttribute.findByIdAndUpdate({_id: attribute['_id']}, attribute, {new: true});
    }

    static async deleteAttribute(id) {
        await modelAttribute.findByIdAndDelete({_id: id});
    }

    static async getSubProducts(id) {
        let subProducts = await modelSubProduct.find({fk_parent: id});

        return subProducts;
    }

    static async insertSubProduct(subProduct) {
        delete subProduct['_id'];
        return await modelSubProduct.create(subProduct);
    }

    static async deleteSubProduct(id) {
        await modelSubProduct.findByIdAndDelete({_id: id});
    }
}

module.exports = Product;