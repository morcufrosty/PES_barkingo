const express = require('express'); // call express
const db = require('./queries');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Barkingo API!' });
});

router.post('/register', db.createUser);

// more routes for our API will happen here

module.exports = router;
