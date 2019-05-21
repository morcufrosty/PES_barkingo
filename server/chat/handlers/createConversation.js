const User = require('../models/user');
const Conversation = require('../models/conversation');

module.exports = async function (request, response, chat) {
    await User.findOne({ UserId: chat.idUserAsker }).populate('conversations').then(
        (user) => {
            if (user) {
                const isConversationExist = user.conversations.filter(conversation => (
                    conversation.userOneId === chat.idUserOwner ||
                    conversation.userTwoId === chat.idUserOwner
                ),
                ).length > 0;
                if (isConversationExist) {
                    return { success: false, msg: 'Chat already exists' }
                    // reply(Boom.badData('You already have conversation with this user'));
                } else {
                    User.findById(chat.idUserOwner).then(
                        (friend) => {
                            const newConversation = new Conversation({
                                chatId: chat.idChat,
                                userOneId: user.UserId,
                                userTwoId: friend.UserId,
                            });
                            newConversation.save().then((conversation) => {
                                user.conversations.push(conversation);
                                user.save();
                                friend.conversations.push(conversation);
                                friend.save();

                                // reply({ id: conversation._id, friendId: friend._id });
                                return { success: true, msg: 'Chat created' }
                            });
                        },
                    );
                }
            } else {
                return { success: false, msg: 'User doesn\'t exist' }
                // reply(Boom.notFound('Cannot find user'));
            }
        },
    );
}
