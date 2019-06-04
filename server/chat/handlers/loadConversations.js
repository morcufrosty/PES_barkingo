const User = require('../models/user');

module.exports = async function(id, reply) {
    await User.findOne({ UserId: id })
        .populate('conversations')
        .then(user => {
            if (user) {
                const conversations = user.conversations.map(conversation => {
                    const friendId = `${user._id}` === conversation.userOneId ? conversation.userTwoId : conversation.userOneId;
                    return {
                        idChat: conversation._id,
                        idUser: friendId,
                        idOffer: conversation.idOffer
                    };
                });
                reply.json({ success: true, offers: conversations, msg: 'Chats found'});
            } else {
                reply.json({ success: false, msg: 'No chats found' });
            }
        });
};
