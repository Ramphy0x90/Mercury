const model = require('../models/product.model');

class Product {
    static async getProduct(id) {
        let product = await model.findOne({_id: id, visible: true});

        return product;
    }

    static async getProducts() {
        let products = await model.find({visible: true});

        return products;
    }

    static async testData() {
        await model.create({
            name: 'Luz led TEST 0',
            description: 'Luz led para internos',
            image: 'https://www.fomei.com/ew/ew_images/image_of_object?ObjectIdentifier=pli:17b95920-d8b5-4340-94d8-658c425d6959&Filter=9c071f19-a887-49a5-b7b5-1fcf62116d80&ImageIndex=4',
            category: 1,
            rating: 5,
            price: 3021,
            visible: true
        });

        await model.create({
            name: 'Luz led TEST 1',
            description: 'Luz led para internos',
            image: 'https://cdn.shopify.com/s/files/1/0206/8076/products/LED_3U_E27_B22_CFL_Cool_White_Warm_White_819be7ee-72db-446f-9986-57d37c8124bc_540x.jpg?v=1522759247',
            category: 1,
            rating: 3,
            price: 3021,
            visible: true
        });

        await model.create({
            name: 'Luz led TEST 3',
            description: 'Luz led para internos',
            image: 'https://files.nowodvorski-lighting.com/9197-2.jpg',
            category: 1,
            rating: 4,
            price: 3021,
            visible: true
        });
    }
}

module.exports = Product;