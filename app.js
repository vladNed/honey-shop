const express = require('express');
const app = express();
const productRoutes = require ('./routes/products');
const orderRoutes = require('./routes/orders');

//Controllers of the API
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.use(function(req, res, next){
    res.status(200).json({
        message: 'It works'
    });
});

module.exports = app;
