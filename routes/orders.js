const express = require('express');
const router = express.Router();

router.get('/', function(req,res){
    res.status(200).json({
        message: 'Handling all the orders'
    });
});

router.post('/', function(req,res){
    res.status(201).json({
        message: 'Order was posted'
    });
});

router.get('/:orderId', function(req,res){
    res.status(200).json({
        message: 'Order details',
        orderId: req.param.orderId
    });
});

router.delete('/:orderId', function(req,res){
    res.status(200).json({
        message: 'Order deleted',
        orderId: req.param.orderId
    });
});
module.exports = router;