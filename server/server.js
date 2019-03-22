const express = require('express'); // call express
const app = express(); // define our app using express
const bodyParser = require('body-parser');
var morgan = require('morgan');

app.use(morgan('dev'));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 80; // set our port

var router = require('./routes.js');
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('API Server running on port ' + port + ' in route /api');
