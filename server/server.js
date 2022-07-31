const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const database = require('./database');
const productRoutes = require('./routes/product.route');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3435;

app.use(cors());
app.use('/api/products', productRoutes);

database.init();
app.listen(port, () => {
    console.log("server running");
});