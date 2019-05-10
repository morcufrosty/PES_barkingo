const pool = require('./db');
const uuidv4 = require('uuid/v4');

const getChats = async (request, response) => {
    const { email, name } = request.decoded;
    response.json({ success: false, msg: 'Not yet implemented' })
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
                                client.query(
                                    'INSERT INTO chats ("idChat", "idOffer", "idUserOffer", "idUserAsker", closed) VALUES ($1, $2, $3, $4, 0);', [uuidv4(), result.rows[0].id, result.rows[0].idOwner, result1.rows[0].id],
                                    (err, result) => {
                                        if (err) {
                                            console.log(err)
                                            response.json({ success: false, msg: 'Chat already exists or an error occured' });
                                        } else {
                                            client.query('COMMIT');
                                            response.json({ success: true, msg: 'Chat created' });
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
    const { email, name } = request.decoded;
    response.json({ success: false, msg: 'Not yet implemented' })
}

module.exports = {
    getChats,
    createChat,
    deleteChat
}