const { createUser,
    loginUser,
    renewGoogleToken,
    renewFacebookToken,
    user } = require('./login_register');

const { currentUser,
    getUser,
    getAllUsers,
    createProfile,
    updateUser,
    deleteUser,
    getUserImage,
    createUserImage } = require('./users');

const { getOffers,
    getAllOffers,
    createOffer,
    offerDetails,
    updateOffer,
    swipe,
    deleteOffer,
    reportOffer,
    eliminateOffer,
    myOffers,
    favourites,
    unfavourite,
    getImage,
    uploadImage,
    deleteSeenOffers,
    racesList } = require('./offers');

const { getChats,
    createChat,
    deleteChat,
    getChatMessages } = require('./chat');

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
    getAllUsers,
    createProfile,
    updateUser,
    deleteUser,
    getUserImage,
    createUserImage,
    //OFFERS
    getOffers,
    getAllOffers,
    createOffer,
    offerDetails,
    updateOffer,
    swipe,
    deleteOffer,
    reportOffer,
    eliminateOffer,
    myOffers,
    favourites,
    unfavourite,
    getImage,
    uploadImage,
    deleteSeenOffers,
    racesList,
    //CHAT
    getChats,
    createChat,
    deleteChat,
    getChatMessages
};
