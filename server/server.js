const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const database = require('./database');
const productRoutes = require('./routes/product.route');
const categoryRoutes = require('./routes/category.route');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3436;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/public', express.static('public'));
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

database.init();
app.listen(port, () => {
    console.log("server running");
});