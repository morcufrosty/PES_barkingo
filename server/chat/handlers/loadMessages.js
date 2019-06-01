const Conversation = require('../models/conversation');

module.exports = async function(id, reply) {
    await Conversation.findById(id)
        .populate('messages')
        .then(conversation => {
            if (conversation) {
                reply.json({ success: true, id: conversation._id, messages: conversation.messages });
            } else {
                reply.json({ success: false, msg: 'Chat not found' });
            }
        });
};
