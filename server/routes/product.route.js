const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.controller');
const path = require('path');
const multer = require('multer');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath = path.join('./public/products');

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

let upload = multer({storage: storage});

// Get products
router.get('/', async (req, res, next) => {
    let products = await controller.getProducts();

    res.json(products);
    next();
});

// Get products by id
router.get('/:id', async (req, res, next) => {
    let productId = req.params.id;
    let product = await controller.getProduct(productId);

    res.json(product);
    next();
});

// Upload product image
router.post('/upload', upload.single('file'), (req, res, next) => {
    if(req.file) res.status(200).send(req.file);
    else res.json({success: false});
});

// Insert product
router.post('/insert', async (req, res, next) => {
    let product = await controller.insert(req.body);
    
    res.status(200).json(product);
    next();
});

router.get('/insert/test', async (req, res, next) => {
    await controller.testData();
    res.status(200).send('ok');
    next();
});

module.exports = router;