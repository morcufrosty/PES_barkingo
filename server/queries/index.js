const { createUser,
    loginUser,
    renewGoogleToken,
    renewFacebookToken,
    user } = require('./login_register');

const { getOffers } = require('./offers');

module.exports = {
    createUser,
    loginUser,
    renewGoogleToken,
    renewFacebookToken,
    user,
    getOffers
};

// TODO: paginacio https://www.moesif.com/blog/technical/api-design/REST-API-Design-Filtering-Sorting-and-Pagination/#
