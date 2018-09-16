const http = require('http');
const port = process.env.PORT || 4200;
const app = require('./app');

app.listen(port, function(){
    console.log('Server listening on port 4200');
});



