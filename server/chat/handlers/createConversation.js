const User = require('../models/user');
const Conversation = require('../models/conversation');
const createUser = require('./createUser');
import strings from '../i18n/i18n';

module.exports = async function(chat, response) {
    console.log(chat);
    let result; // = { success: false, msg: '' }
    await User.findOne({ UserId: chat.idUserAsker })
        .populate('conversations')
        .then(user => {
            console.log('entrem logging');
            if (user) {
                const isConversationExist = user.conversations.filter(conversation => (conversation.userOneId === chat.idUserOwner || conversation.userTwoId === chat.idUserOwner) && conversation.idOffer === chat.idOffer).length > 0;
                if (isConversationExist) {
                    console.log('already exists');
                    response.json({ success: false, msg: strings('chat.chatExists') });
                } else {
                    User.findOne({ UserId: chat.idUserOwner }).then(friend => {
                        if (friend) {
                            // console.log(friend);
                            // console.log(user);
                            const newConversation = new Conversation({
                                idOffer: chat.idOffer,
                                userOneId: user.UserId,
                                userTwoId: friend.UserId,
                            });
                            newConversation.save().then(conversation => {
                                // console.log(conversation);
                                user.conversations.push(conversation);
                                friend.conversations.push(conversation);
                                user.save();
                                friend.save();

                                response.json({ success: true, msg: strings('chat.created') });
                            });
                        } else {
                            response.json({ success: false, msg: strings('chat.userNotExists') });
                        }
                    });
                }
            } else {
                response.json({ success: false, msg: strings('chat.noUser') });
            }
        });
    console.log(result);
    // return result;
};
