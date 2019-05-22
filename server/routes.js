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

//LOGIN_REGISTER ROUTES

router.post('/users/register', db.createUser);

router.post('/users/login', db.loginUser);

router.post('/users/renewGoogleToken', db.renewGoogleToken);

router.post('/users/renewFacebookToken', db.renewFacebookToken);

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

//USERS ROUTES

router.get('/users/currentUser', db.currentUser);

router.get('/users/:id', db.getUser);

router.post('/users/:id', db.createProfile);

router.put('/users/:id', db.updateUser);

router.delete('/users/:id', db.deleteUser);

router.get('/users/:id/image', db.getUserImage);

router.post('/users/:id/image', db.createUserImage);


//OFFERS ROUTES

router.get('/offers', db.getOffers);

router.post('/offers', db.createOffer);

//router.delete('/offers/:id/elim', db.eliminateOffer);

router.get('/offers/currentUser', db.myOffers);

router.get('/offers/favourite', db.favourites);

router.delete('/offers/seen', db.deleteSeenOffers);

router.delete('/offers/:id/favourite', db.unfavourite);

router.get('/offers/:id/image', db.getImage);

router.post('/offers/:id/image', db.uploadImage);

router.get('/offers/:id', db.offerDetails);

router.put('/offers/:id', db.updateOffer);

router.post('/offers/:id', db.swipe);

router.delete('/offers/:id', db.deleteOffer);

router.post('/offers/:id/report', db.reportOffer);

router.get('/races', db.racesList);

router.get('/chats', db.getChats);

router.post('/offers/:id/chat', db.createChat);

router.delete('/chats/:id', db.deleteChat);

// more routes for our API will happen here

module.exports = router;
