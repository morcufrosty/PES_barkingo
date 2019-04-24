const express = require('express'); // call express
const db = require('./queries');
const creds = require('./creds.json');
const jwt = require('jsonwebtoken');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Barkingo API!' });
});

router.post('/register', db.createUser);

router.post('/login', db.loginUser);

router.post('/renewGoogleToken', db.renewGoogleToken);

router.post('/renewFacebookToken', db.renewFacebookToken);

// molt important l'ordre d'aquest middleware pq simplement comprovarà
// les requests que es troben a sota i per tant assegurarà que no calqui token per iniciar sessió i etc
router.use((req, res, next) => {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, creds.secret, (err, decoded) => {
            if (err) {
                res.status(403);
                return res.json({ success: false, msg: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            msg: 'No token provided.',
        });
    }
});

router.get('/user', db.user);

router.get('/middletest', (req, res) => {
    res.json({ hey: 'nice' });
});

router.get('/offers', db.getOffers);

router.get('/offers/:id', db.offerDetails);

router.post('/offers', db.createOffer);

router.put('/offers/:id', db.updateOffer);

router.get('/myOffers', db.myOffers);

router.post('/offers/:id', db.swipe);

router.get('/offers/:id/image', db.getImage);

router.post('/offers/:id/image', db.uploadImage);

router.get('/favouriteOffers', db.favourites);

// more routes for our API will happen here

module.exports = router;
