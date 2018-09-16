const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product-schema');

router.get('/', function(req, res, next) {
    Product.find()
        .exec()
        .then(products => {
            res.status(200).json({products: products})
        })
        .catch(err => res.send(500).json({error: err}));
});

router.post('/', function(req, res) {
    var Product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.Name,
        price: req.body.Price,
        quantity: req.body.Quantity
    }); 
    
    //Creation and product ID should be remade
    Product
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Product created',
                creationId: 'FLR000',
                product: result,
                timeOfCreation: Date.now()
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error at creating a product',
                creationId: 'FLR000',
                error: err
            })
        });
});

router.get('/:productId', function(req, res) {
   const productid = req.params.productId;
   Product.findById(productid)
    .exec()
    .then(product => {
        if(product){
            res.status(200).json(product);
        } else {
            res.status(404).json({
                message: 'Product not found',
                error: '404 Not Found'
            })
        }
    })
    .catch(err => {
        res.status(500).json({error: err})
    });
});

router.patch('/:productId', function(req, res, next) {
    const productid = req.params.productId;
    const updateOps = {};

    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Product.update({_id: productid},{$set: updateOps})
        .exec()
        .then(product => {
            res.status(200).json({
                message: 'Product updated',
                productId: productid,
                newProduct: {
                    updateOps
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error at creating a product',
                creationId: 'FLR000',
                error: err
            })
        });
});

router.delete('/:productId', function(req, res) {
    const productid = req.params.productId;
    Product.remove({_id: productid})
        .exec()
        .then(result => {
            res.status(204).json({
                message: 'Product deleted',
                productId: productid
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error deleting product',
                error: err
            })
        })
});

module.exports = router;