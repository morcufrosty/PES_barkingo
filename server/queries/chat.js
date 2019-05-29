const pool = require('./db');
const uuidv4 = require('uuid/v4');
const chatHandlers = require('../chat/handlers')

const getChats = async (request, response) => {
    const { email, name } = request.decoded;
    await pool.connect(async (err, client, done) => {
        if (err) {
            response.json({ success: false, msg: 'Error accessing the database' });
            done();
            return;
        }
        await client.query('BEGIN');
        await client.query(
            'SELECT id FROM users WHERE email=$1 AND name=$2;', [email, name],
            (err, result) => {
                if (err || result.rowCount == 0) {
                    console.log(err)
                    response.json({ success: false, msg: 'User ' + email + ' doesn\'t exist' });
                } else {
                    client.query(
                        'SELECT chats."idChat", chats."idUserAsker" AS "idUser", chats."idOffer" FROM chats WHERE chats."idUserOffer"=$1 AND chats.closed=0 UNION SELECT chats."idChat", chats."idUserOffer" AS "idUser", chats."idOffer" FROM chats WHERE chats."idUserAsker"=$1 AND chats.closed=0;',
                        [result.rows[0].id], (err, res) => {
                            if (err || res.rowCount == 0) {
                                console.log(err)
                                response.json({ success: false, msg: 'No chats found' });
                            } else {
                                response.json({ success: true, offers: res.rows });
                            }
                        });
                }
            });
        done();
    })
}

const createChat = async (request, response) => {
    const { email, name } = request.decoded;
    const { id: idOffer } = request.params;
    await pool.connect(async (err, client, done) => {
        if (err) {
            response.json({ success: false, msg: 'Error accessing the database' });
            done();
            return;
        }
        await client.query('BEGIN');
        await client.query(
            'SELECT id FROM users WHERE email=$1 AND name=$2;', [email, name],
            (err, result1) => {
                if (err || result1.rowCount == 0) {
                    console.log(err);
                    response.status(404);
                    response.json({ success: false, msg: 'User doesn\'t exist' });
                } else {
                    client.query(
                        'SELECT "openedOffers".id, "openedOffers"."idOwner" FROM "openedOffers" WHERE "openedOffers".id=$1;', [idOffer],
                        (err, result) => {
                            if (err || result.rowCount == 0) {
                                console.log(err)
                                response.status(404);
                                response.json({ success: false, msg: 'Offer doesn\'t exist' });
                            } else {
                                const id = uuidv4();
                                client.query(
                                    'INSERT INTO chats ("idChat", "idOffer", "idUserOffer", "idUserAsker", closed) VALUES ($1, $2, $3, $4, 0);', [id, result.rows[0].id, result.rows[0].idOwner, result1.rows[0].id],
                                    (err, res) => {
                                        if (err) {
                                            console.log(err)
                                            response.json({ success: false, msg: 'Chat already exists or an error occured' });
                                        } else {
                                            chatHandlers.createConversation({ idChat: id, idUserOwner: result.rows[0].idOwner, idUserAsker: result1.rows[0].id })
                                            .then((res) => {
                                                if (res.success) {
                                                    client.query('COMMIT');
                                                    response.json({ success: true, msg: 'Chat created' });
                                                } else response.json(res);
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                            });
                                        }
                                    }
                                )
                            }
                        }
                    )
                }
            }
        );
        done();
    })
}

const deleteChat = async (request, response) => {
    const { email, name: userName } = request.decoded;
    const { id: idOffer } = request.params;
    await pool.connect(async (err, client, done) => {
        if (err) {
            response.json({ success: false, msg: 'Error accessing the database' });
            done();
            return;
        }
        await client.query('BEGIN');
        await client.query(
            'SELECT id FROM users WHERE email=$1 AND name=$2;', [email, userName],
            (err, result) => {
                if (err || result.rowCount == 0) {
                    console.log(err)
                    response.json({ success: false, msg: 'User ' + email + ' doesn\'t exist' });
                } else {
                    client.query(
                        'UPDATE chats SET closed=1 WHERE "idChat"=$1;', [idOffer],
                        (error, res) => {
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
    })
}

module.exports = {
    getChats,
    createChat,
    deleteChat
}