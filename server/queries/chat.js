const pool = require('./db');
const uuidv4 = require('uuid/v4');
const chatHandlers = require('../chat/handlers');

const getChats = async (request, response) => {
    const { email, name } = request.decoded;
    await pool.connect(async (err, client, done) => {
        if (err) {
            response.json({ success: false, msg: 'Error accessing the database' });
            done();
            return;
        }
        await client.query('BEGIN');
        await client.query('SELECT id FROM users WHERE email=$1 AND name=$2;', [email, name], (err, result) => {
            if (err || result.rowCount == 0) {
                console.log(err);
                response.json({ success: false, msg: 'User ' + email + " doesn't exist" });
            } else {
                chatHandlers.loadConversations(result.rows[0].id, response);
            }
        });
        done();
    });
};

const createChat = async (request, response) => {
    const { email, name } = request.decoded;
    const { id: idOffer } = request.params;
    pool.connect(async (err, client, done) => {
        if (err) {
            response.json({ success: false, msg: 'Error accessing the database' });
            done();
            return;
        }
        client.query('BEGIN');
        client.query('SELECT id FROM users WHERE email=$1 AND name=$2;', [email, name], (err, result1) => {
            if (err || result1.rowCount == 0) {
                console.log(err);
                response.status(404);
                response.json({ success: false, msg: "User doesn't exist" });
            } else {
                client.query('SELECT "openedOffers".id, "openedOffers"."idOwner" FROM "openedOffers" WHERE "openedOffers".id=$1;', [idOffer], (err, result) => {
                    if (err || result.rowCount == 0) {
                        console.log(err);
                        response.status(404);
                        response.json({ success: false, msg: "Offer doesn't exist" });
                    } else {
                        // const id = uuidv4();
                        const pr = chatHandlers.createConversation({ idOffer: result.rows[0].id, idUserOwner: result.rows[0].idOwner, idUserAsker: result1.rows[0].id }, response);
                        // .then(res => {
                        //     console.log(res);
                        //     if (res.success) {
                        //         client.query('COMMIT');
                        //         response.json({ success: true, msg: 'Chat created' });
                        //     } else response.json(res);
                        // })
                        // .catch(error => {
                        //     console.log(error);
                        // });
                        // console.log(pr);
                    }
                });
            }
        });
        done();
    });
};

const deleteChat = async (request, response) => {
    const { email, name: userName } = request.decoded;
    const { id: idOffer } = request.params;
    response.json({ success: false, msg: 'Disabled function' });
    return;
    await pool.connect(async (err, client, done) => {
        if (err) {
            response.json({ success: false, msg: 'Error accessing the database' });
            done();
            return;
        }
        await client.query('BEGIN');
        await client.query('SELECT id FROM users WHERE email=$1 AND name=$2;', [email, userName], (err, result) => {
            if (err || result.rowCount == 0) {
                console.log(err);
                response.json({ success: false, msg: 'User ' + email + " doesn't exist" });
            } else {
                client.query('UPDATE chats SET closed=1 WHERE "idChat"=$1;', [idOffer], (error, res) => {
                    if (error) {
                        console.error('Unknown error', error);
                    } else {
                        client.query('COMMIT');
                        response.json({ success: true, msg: 'Chat deleted successfully', id: idOffer });
                    }
                });
            }
        });
        done();
    });
};

const getChatMessages = async (request, response) => {
    const { email, name } = request.decoded;
    const { id } = request.params;
    chatHandlers.loadMessages(id, response);
}

module.exports = {
    getChats,
    createChat,
    deleteChat,
    getChatMessages
};
