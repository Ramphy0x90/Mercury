const express = require('express');
const router = express.Router();
const controller = require('../controllers/category.controller');
const path = require('path');
const multer = require('multer');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath = path.join('./public/categories');

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

let upload = multer({storage: storage});

// Get categories
router.get('/', async (req, res, next) => {
    // Categories filters
    let allCategories = req.query.all;

    let categories = [];

    if(allCategories == 'true') {
        categories = await controller.getAllCategories();
    } else {
        categories = await controller.getCategories();
    }

    res.json(categories);
    next();
});

// Get category by id
router.get('/:id', async (req, res, next) => {
    let categoryId = req.params.id;
    let category = await controller.getCategory(categoryId);

    res.json(category);
    next();
});

// Upload category image
router.post('/upload', upload.single('file'), (req, res, next) => {
    if(req.file) res.status(200).send(req.file);
    else res.json({success: false});
});

// Insert category
router.post('/insert', async (req, res, next) => {
    let category = await controller.insert(req.body);
    
    res.status(200).json(category);
    next();
});

// Update category
router.post('/update', async (req, res, next) => {
    let category = await controller.update(req.body);
    
    res.status(200).json(category);
    next();
});

// Delete category
router.delete('/delete', async (req, res, next) => {
    let categoryId = req.query.id;
    await controller.delete(categoryId);

    res.status(200).send();
    next();
});

module.exports = router;