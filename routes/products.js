const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.status(200).json({
        message: 'Handling GET request on products'
    });
});

router.post('/', function(req, res) {
    res.status(201).json({
        message: 'Handling POST request on products'
    });
});

router.get('/:productid', function(req, res) {
    res.status(201).json({
        message: 'Handling GET/id request on products'
    });
});