const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    UserId: String,
    fullName: {
        type: String,
        required: true,
        unique: false,
    },
    conversations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
    }],
});

module.exports = mongoose.model('User', userSchema);