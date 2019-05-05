const { createUser,
    loginUser,
    renewGoogleToken,
    renewFacebookToken,
    user } = require('./login_register');
    
const { currentUser,
    getUser,
    createUser,
    updateUser,
    getUserImage,
    createUserImage } = require('./users');    

const { getOffers,
    createOffer,
    offerDetails,
    updateOffer,
    swipe,
    deleteOffer,
    //eliminateOffer,
    myOffers,
    favourites,
    getImage,
    uploadImage,
    deleteSeenOffers,
    racesList } = require('./offers');

module.exports = {
    //LOGIN_REGISTER
    createUser,
    loginUser,
    renewGoogleToken,
    renewFacebookToken,
    user,
    //USERS
    currentUser,
    getUser,
    createUser,
    updateUser,
    getUserImage,
    createUserImage,
    //OFFERS
    getOffers,
    createOffer,
    offerDetails,
    updateOffer,
    swipe,
    deleteOffer,
    //eliminateOffer,
    myOffers,
    favourites,
    getImage,
    uploadImage,
    deleteSeenOffers,
    racesList
};

// TODO: paginacio https://www.moesif.com/blog/technical/api-design/REST-API-Design-Filtering-Sorting-and-Pagination/#
