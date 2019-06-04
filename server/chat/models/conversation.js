const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    idOffer: String,
    userOneId: String,
    userTwoId: String,
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    }],
});

module.exports = mongoose.model('Conversation', conversationSchema);