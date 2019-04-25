const { createUser,
    loginUser,
    renewGoogleToken,
    renewFacebookToken,
    user } = require('./login_register');

const { getOffers,
    createOffer,
    updateOffer,
    deleteOffer,
    myOffers,
    swipe,
    getImage,
    uploadImage,
    favourites,
    offerDetails,
    deleteSeenOffers,
    racesList } = require('./offers');

module.exports = {
    createUser,
    loginUser,
    renewGoogleToken,
    renewFacebookToken,
    user,
    getOffers,
    createOffer,
    updateOffer,
    deleteOffer,
    myOffers,
    swipe,
    getImage,
    uploadImage,
    favourites,
    offerDetails,
    deleteSeenOffers,
    racesList
};

// TODO: paginacio https://www.moesif.com/blog/technical/api-design/REST-API-Design-Filtering-Sorting-and-Pagination/#
