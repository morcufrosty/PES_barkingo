const User = require('../models/user');

module.exports = async function(id, reply) {
    await User.findOne({ UserId: id })
        .populate('conversations')
        .then(user => {
            if (user) {
                const conversations = user.conversations.map(conversation => {
                    const friendId = `${user._id}` === conversation.userOneId ? conversation.userTwoId : conversation.userOneId;
                    return {
                        id: conversation._id,
                        friendId,
                    };
                });
                reply.json(conversations);
            } else {
                reply.json({ success: false, msg: 'No chats found' });
            }
        });
};
