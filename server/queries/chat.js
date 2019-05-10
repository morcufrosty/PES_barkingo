const pool = require('./db');

const getChats = async (request, response) => {
    const { email, name } = request.decoded;
    response.json({ success: false, msg: 'Not yet implemented' })
}
const createChat = async (request, response) => {
    const { email, name } = request.decoded;
    response.json({ success: false, msg: 'Not yet implemented' })
}

const deleteChat = async (request, response) => {
    const { email, name } = request.decoded;
    response.json({ success: false, msg: 'Not yet implemented' })
}

module.exports = {
    createChat
}