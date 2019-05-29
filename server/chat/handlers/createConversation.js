const User = require('../models/user');
const Conversation = require('../models/conversation');
const createUser = require('./createUser')

module.exports = async function (chat) {
    console.log(chat);
    let result // = { success: false, msg: '' }
    await User.findOne({ UserId: chat.idUserAsker }).populate('conversations').then(
        (user) => {
            if (user) {
                const isConversationExist = user.conversations.filter(conversation => (
                    conversation.userOneId === chat.idUserOwner ||
                    conversation.userTwoId === chat.idUserOwner
                ),
                ).length > 0;
                if (isConversationExist) {
                    result = { success: false, msg: 'Chat already exists' };
                    // reply(Boom.badData('You already have conversation with this user'));
                } else {
                    User.findOne({ UserId: chat.idUserOwner }).then(
                        (friend) => {
                            if (friend) {
                                console.log(friend)
                                console.log(user)
                                const newConversation = new Conversation({
                                    chatId: chat.idChat,
                                    userOneId: user.UserId,
                                    userTwoId: friend.UserId,
                                });
                                newConversation.save().then((conversation) => {
                                    console.log(conversation)
                                    user.conversations.push(conversation);
                                    friend.conversations.push(conversation);
                                    user.save();
                                    friend.save();

                                    // reply({ id: conversation._id, friendId: friend._id });
                                    result = { success: true, msg: 'Chat created' };
                                });
                            } else {
                                result = { success: false, msg: 'The user owner ' }
                            }

                        }
                    );
                }
            } else {
                result = { success: false, msg: 'User doesn\'t exist' };
                // reply(Boom.notFound('Cannot find user'));
            }
        },
    );
    return result;
}
