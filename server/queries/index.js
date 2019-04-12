const { createUser,
    loginUser,
    renewGoogleToken,
    renewFacebookToken,
    user } = require('./login_register');

const { getOffers,
    createOffer,
    myOffers,
    swipeRight } = require('./offers');

module.exports = {
    createUser,
    loginUser,
    renewGoogleToken,
    renewFacebookToken,
    user,
    getOffers,
    createOffer,
    myOffers,
    swipeRight
};

// TODO: paginacio https://www.moesif.com/blog/technical/api-design/REST-API-Design-Filtering-Sorting-and-Pagination/#
