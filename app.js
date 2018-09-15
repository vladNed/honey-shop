const express = require('express');
const app = express();
const productRoutes = require ('./routes/products');
const morgan = require('morgan');
const orderRoutes = require('./routes/orders');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Morgan is used to log every request handled by the API
app.use(morgan('dev'));

//Connect to database dev
mongoose.connect('mongodb://devnet:'+ process.env.MONGO_ATLAS_PASSWORD +'@developmentvlad-shard-00-00-zhmc4.mongodb.net:27017,developmentvlad-shard-00-01-zhmc4.mongodb.net:27017,developmentvlad-shard-00-02-zhmc4.mongodb.net:27017/test?ssl=true&replicaSet=developmentVlad-shard-0&authSource=admin&retryWrites=true')

//Parsing bodies
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Handling CORS
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, Authorization');
    if( req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
});

//Controllers of the API
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.use('/', function(req,res,next){
    const error = new Error('Not Found!');
    error.status = 404;
    next(error);
});

//Error handling
app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            title: "Error occured",
            message: error.message
        }
    });
});

module.exports = app;
