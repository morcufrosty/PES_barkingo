const pool = require('./db');
const uuidv4 = require('uuid/v4');
const path = require('path');
const homedir = require('os').homedir();
const imagesDir = '.images';

const getOffers = async (request, response) => {
    const { email, name } = request.decoded;
    await pool.connect(async (err, client, done) => {
        if (err) {
            response.json({ success: false, msg: 'Error accessing the database' });
            done();
            return;
        }
        await client.query('BEGIN');
        await client.query(
            'SELECT "openedOffers".id, "openedOffers".name, "openedOffers".sex, "openedOffers".race, "openedOffers"."TypeName" FROM "openedOffers", users WHERE users.name<>$1 and users.email<>$2 and "openedOffers"."idOwner" = users.id;',
            [name, email], (err, result) => {
                if (err || result.rowCount == 0) {
                    console.log(err)
                    response.json({ success: false, msg: 'No offers found' });
                } else {
                    response.json({ success: true, msg: 'Offers found', offers: result.rows });
                }
            });
        done();
    })
}

const createOffer = async (request, response) => {
    const { email, name: userName } = request.decoded;
    let { name, type, race, sex, age, description, iniDate, endDate } = request.body || request.query;
    await pool.connect(async (err, client, done) => {
        if (err) {
            response.json({ success: false, msg: 'Error accessing the database' });
            done();
            return;
        }
        await client.query('BEGIN');
        if (description === undefined) description = "null";
        if (iniDate === undefined) iniDate = "null";
        if (endDate === undefined) endDate = "null";
        await client.query(
            'SELECT id FROM users WHERE email=$1 AND name=$2;', [email, userName],
            (err, result) => {
                if (err || result.rowCount == 0) {
                    console.log(err)
                    response.json({ success: false, msg: 'User ' + email + ' doesn\'t exist' });
                } else {
                    let idOffer = uuidv4();
                    client.query(
                        'INSERT INTO animals (id, name, offer, race, sex, age, description, "idOwner") VALUES ($1, $2, $3, $4, $5, $6, $7, $8);',
                        [idOffer, name, type, race, sex, age, description, result.rows[0].id],
                        (error, res) => {
                            if (error) {
                                console.error('Unknown error', error);
                            } else {
                                client.query('COMMIT');
                                response.json({ success: true, msg: 'Offer created successfully', id: idOffer });
                            }
                        });
                }
            });
        done();
    })
}

const updateOffer = async (request, response) => {
    response.json({ success: false, msg: 'Not implemented yet' });
    /*const { email, name: userName } = request.decoded;
    const { id: idOffer } = request.params;
    let { name, type, race, sex, age, description, iniDate, endDate } = request.body || request.query;
    await pool.connect(async (err, client, done) => {
        if (err) {
            response.json({ success: false, msg: 'Error accessing the database' });
            done();
            return;
        }
        await client.query('BEGIN');
        if (description === undefined) description = "null";
        if (iniDate === undefined) iniDate = "null";
        if (endDate === undefined) endDate = "null";
        await client.query(
            'SELECT id FROM users WHERE email=$1 AND name=$2;', [email, userName],
            (err, result) => {
                if (err || result.rowCount == 0) {
                    console.log(err)
                    response.json({ success: false, msg: 'User ' + email + ' doesn\'t exist' });
                } else {
                    let idOwn = result.rows[0].id
                    client.query(
                        'SELECT id FROM animals WHERE id=$1 AND "idOwner"=$2;', [idOffer, idOwn],
                        if (err || result.rowCount == 0) {
                            console.log(err)
                            response.json({ success: false, msg: 'Offer ' + idOffer + ' doesn\'t exist' });
                        } else {
                            client.query(
                                'UPDATE animals SET name=$1, offer=$2, race=$3, sex=$4, age=$5, description=$6, "idOwner"=$7 WHERE id=$8;', [name, type, race, sex, age, description, idOwn, idOffer],
                                (error, res) => {
                                if (error) {
                                    console.error('Unknown error', error);
                                } else {
                                    client.query('COMMIT');
                                    response.json({ success: true, msg: 'Offer updated successfully', id: idOffer });
                                }
                            });
                        });
                }
            });
        done();
    })*/
}

const myOffers = async (request, response) => {
    const { email, name } = request.decoded;
    await pool.connect(async (err, client, done) => {
        if (err) {
            response.json({ success: false, msg: 'Error accessing the database' });
            done();
            return;
        }
        await client.query('BEGIN');
        await client.query(
            'SELECT "openedOffers".id, "openedOffers".name, "openedOffers".sex, "openedOffers".race, "openedOffers"."TypeName", "openedOffers"."urlImage" FROM "openedOffers", users WHERE users.name=$1 and users.email=$2 and "openedOffers"."idOwner" = users.id;',
            [name, email], (err, result) => {
                if (err || result.rowCount == 0) {
                    console.log(err)
                    response.json({ success: false, msg: 'No offers found' });
                } else {
                    response.json({ success: true, msg: 'Offers found', offers: result.rows });
                }
            });
        done();
    })
}

const swipe = async (request, response) => {
    const { email, name } = request.decoded;
    const { direction } = request.body || request.query;
    const { id: idOffer } = request.params;
    let table;
    if (direction === 'right') table = 'favourites';
    else if (direction === 'left') table = 'seen';
    else {
        response.json({ success: false, msg: 'Wrong swipe direction ' + direction });
        return;
    }
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
                    response.json({ success: false, msg: 'User doesn\'t exist' });
                } else {
                    client.query(
                        'INSERT INTO ' + table + '("idUser", "idOffer") VALUES ($1, $2);', [result.rows[0].id, idOffer],
                        (err, result) => {
                            if (err) {
                                console.log(err)
                                response.json({ success: false, msg: 'Offer is already in ' + table + ' or an error occured' });
                            } else {
                                client.query('COMMIT');
                                response.json({ success: true, msg: 'Offer added to ' + table });
                            }
                        }
                    )
                }
            }
        );
        done();
    })
}

const getImage = async (request, response) => {
    const { id: idOffer } = request.params;
    response.sendFile(path.join(homedir, imagesDir, idOffer + '.jpg'));
}

const uploadImage = async (request, response) => {
    const { id: idOffer } = request.params;
    const image = request.files.image;

    require("fs").writeFile(path.join(homedir, imagesDir, idOffer + '.jpg'), image.data, (err) => {
        if (err) {
            console.log(err);
            response.json({ success: false, msg: 'Image couldn\'t be uploaded' });
        } else response.json({ success: true, msg: 'Image added successfully'});
    });
}

module.exports = {
    getOffers,
    createOffer,
    updateOffer,
    myOffers,
    swipe,
    getImage,
    uploadImage
}
