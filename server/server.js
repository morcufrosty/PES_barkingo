const express = require('express'); // call express
const app = express(); // define our app using express
const bodyParser = require('body-parser');
const morgan = require('morgan');
const upload = require('express-fileupload');
const mongoose = require('mongoose');
const creds = require('./creds.json');

app.use(morgan('dev'));
app.disable('etag');
app.use(upload());

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 80; // set our port

var router = require('./routes.js');
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.use((req, res, next) => {
    return res.status(404).json({ success: false, msg: 'Route ' + req.url + ' Not found.' });
});

// 500 - Any server error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, msg: 'Server error' });
});

mongoose.connect(creds.chatDB, { useNewUrlParser: true });

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('API Server running on port ' + port + ' in route /api');
