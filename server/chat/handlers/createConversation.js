const User = require('../models/user');
const Conversation = require('../models/conversation');
const createUser = require('./createUser');

module.exports = async function(chat, response) {
    console.log(chat);
    let result; // = { success: false, msg: '' }
    await User.findOne({ UserId: chat.idUserAsker })
        .populate('conversations')
        .then(user => {
            console.log('entrem logging');
            if (user) {
                const isConversationExist = user.conversations.filter(conversation => conversation.userOneId === chat.idUserOwner || conversation.userTwoId === chat.idUserOwner).length > 0;
                if (isConversationExist) {
                    console.log('already exists');
                    response.json({ success: false, msg: 'Chat already exists' });
                } else {
                    User.findOne({ UserId: chat.idUserOwner }).then(friend => {
                        if (friend) {
                            console.log(friend);
                            console.log(user);
                            const newConversation = new Conversation({
                                idOffer: chat.idOffer,
                                userOneId: user.UserId,
                                userTwoId: friend.UserId,
                            });
                            newConversation.save().then(conversation => {
                                console.log(conversation);
                                user.conversations.push(conversation);
                                friend.conversations.push(conversation);
                                user.save();
                                friend.save();

                                response.json({ success: true, msg: 'Chat created' });
                            });
                        } else {
                            response.json({ success: false, msg: "The user owner doesn't exist" });
                        }
                    });
                }
            } else {
                response.json({ success: false, msg: "User doesn't exist" });
            }
        });
    console.log(result);
    // return result;
};
