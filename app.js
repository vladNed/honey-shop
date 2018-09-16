const express = require('express');
const app = express();
const productRoutes = require ('./api/controllers/products');
const morgan = require('morgan');
const orderRoutes = require('./api/controllers/orders');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Morgan is used to log every request handled by the API
app.use(morgan('dev'));

//Connect to database dev
mongoose.connect(
    'mongodb+srv://devNet:'+process.env.MONGO_ATLAS_PASSWORD+'@developmentvlad-zhmc4.mongodb.net/test?retryWrites=true',
    {
        useNewUrlParser: true
    },
    err => {
        console.log('not connected'+ err);
    }
);

//Parsing bodies
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Handling CORS
/* app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, Authorization');
    if( req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
});  */

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
