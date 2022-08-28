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
    // Products filters
    let allProducts = req.query.all;
    let visible = req.query.visible;

    let products = [];

    if(allProducts == 'true') {
        products = await controller.getAllProducts();
    } else {
        products = await controller.getProducts();
    }

    res.json(products);
    next();
});

// Get product by id
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

// Update product
router.post('/update', async (req, res, next) => {
    let product = await controller.update(req.body);
    
    res.status(200).json(product);
    next();
});

// Delete product
router.delete('/delete', async (req, res, next) => {
    let productId = req.query.id;
    await controller.delete(productId);

    console.log("TTETTE")
    
    res.status(200).send();
    next();
});

module.exports = router;