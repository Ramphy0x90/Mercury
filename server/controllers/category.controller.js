const model = require('../models/category.model');

class Category {
    static async getCategory(id) {
        let category = await model.findOne({_id: id});

        return category;
    }

    static async getCategories() {
        let categories = await model.find({visible: true});

        return categories;
    }

    static async getAllCategories() {
        let categories = await model.find();

        return categories;
    }

    static async getcategoriesByFilter() {
        let categories = await model.find();

        return categories;
    }

    static async insert(category) {
        delete category['_id'];
        return await model.create(category);
    }

    static async update(category) {
        return await model.findByIdAndUpdate({_id: category['_id']}, category, {new: true});
    }

    static async delete(id) {
        await model.findByIdAndDelete({_id: id});
    }
}

module.exports = Category;