const Conversation = require('../models/conversation');

module.exports = async function (request, reply) {
  await Conversation.findById(request.params.conversationId).populate('messages').then(
    (conversation) => {
      if (conversation) {
        reply({ id: conversation._id, messages: conversation.messages });
      } else {
        reply(Boom.notFound('Cannot find conversations'));
      }
    },
  );
}
