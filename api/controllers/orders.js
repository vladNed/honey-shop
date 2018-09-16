const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order-schema');
const Product = require('../models/product-schema');

router.get('/', function(req,res, next){
    res.status(200).json({
        message: 'Handling all the orders'
    });
});

router.post('/', function(req,res,next){
    Product.findById(req.body.ProductId)
        .then(product => {
            if(!product){
                return res.status(404).json({
                    message: 'Product not found'
                })
            } else {
                const order = new Order({
                    _id: mongoose.Types.ObjectId(),
                    quantity: req.body.Quantity,
                    product: req.body.ProductId
                });         
                return order.save()
            }
        })
        .then(result => {
            res.status(201).json({
                message: 'Order stored',
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Order could not be created!',
                error: err
            });
        });
});

router.get('/:orderId', function(req,res,next){
    res.status(200).json({
        message: 'Order details',
        orderId: req.param.orderId
    });
});

router.delete('/:orderId', function(req,res,next){
    res.status(200).json({
        message: 'Order deleted',
        orderId: req.param.orderId
    });
});

module.exports = router;