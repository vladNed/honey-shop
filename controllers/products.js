const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.status(200).json({
        message: 'Handling GET request on products'
    });
});

router.post('/', function(req, res) {
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(201).json({
        message: 'Handling POST request on products',
        product: product
    });
});

router.get('/:productid', function(req, res) {
   const productid = req.params.productid;
   if (id == 'miere') {
       res.status(200).json({
           message: 'Miere product was called'
       })
   } else if (id == 'laptisor') {
        res.status(200).json({
            message: 'Laptisor product was called'
        })
   } else {
       res.status(404).json({
            title: 'Not Found',
            message: 'The product with this id was not found'
       });
   }
});

router.patch('/:productid', function(req, res) {
    const productid = req.params.productid;
    res.status(200).json({
        message: 'Updated product!'
    })
});

router.patch('/:productid', function(req, res) {
    const productid = req.params.productid;
    res.status(200).json({
        message: 'Deleted product'
    })
});

module.exports = router;