const pool = require('./db');
const uuidv4 = require('uuid/v4');
const fs = require('fs');
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
            'SELECT id FROM users WHERE email=$1 AND name=$2;', [email, name],
            (err, result) => {
                if (err || result.rowCount == 0) {
                    console.log(err)
                    response.json({ success: false, msg: 'User ' + email + ' doesn\'t exist' });
                } else {
                    client.query(
                        'SELECT "openedOffers".id, "openedOffers".name, "openedOffers".sex, "openedOffers".race, "openedOffers"."TypeName" FROM "openedOffers" WHERE "openedOffers"."idOwner"<>$1 and NOT EXISTS (SELECT * FROM seen WHERE seen."idOffer"="openedOffers".id and seen."idUser"=$1) and NOT EXISTS (SELECT * FROM favourites WHERE favourites."idOffer"="openedOffers".id and favourites."idUser"=$1);',
                        [result.rows[0].id], (err, res) => {
                            if (err || res.rowCount == 0) {
                                console.log(err)
                                response.json({ success: false, msg: 'No offers found' });
                            } else {
                                response.json({ success: true, msg: 'Offers found', offers: res.rows.slice(0, 10) });
                            }
                        });
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
                        'INSERT INTO animals (id, name, offer, race, sex, age, description, "idOwner", status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 0);',
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
    //response.json({ success: false, msg: 'Not implemented yet' });
    const { email, name: userName } = request.decoded;
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
                        'UPDATE animals SET name=$1, offer=$2, race=$3, sex=$4, age=$5, description=$6, "idOwner"=$7 WHERE id=$8;', [name, type, race, sex, age, description, idOwn, idOffer],
                        (error, res) => {
                        if (error) {
                            console.error('Unknown error', error);
                        } else {
                            client.query('COMMIT');
                            response.json({ success: true, msg: 'Offer updated successfully', id: idOffer });
                        }
                    });
                }
            });
        done();
    })
}

const deleteOffer = async (request, response) => {
    //response.json({ success: false, msg: 'Not implemented yet' });
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
                        'UPDATE animals SET status=1 WHERE id=$1;', [idOffer],
                        (error, res) => {
                        if (error) {
                            console.error('Unknown error', error);
                        } else {
                            client.query('COMMIT');
                            response.json({ success: true, msg: 'Offer deleted successfully', id: idOffer });
                        }
                    });
                }
            });
        done();
    })
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
    if (direction.toString().trim() === 'right') table = 'favourites';
    else if (direction.toString().trim() === 'left') table = 'seen';
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
    const data = fs.readFile(path.join(homedir, imagesDir, idOffer + '.jpg'), (err, data) => {
        const img = Buffer.from(data, 'base64');
        console.log(img);
        response.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': img.length
        });
        response.end(img);
    });
}

const uploadImage = async (request, response) => {
    const { id: idOffer } = request.params;
    const image = request.files.image;

    require("fs").writeFile(path.join(homedir, imagesDir, idOffer + '.jpg'), image.data, (err) => {
        if (err) {
            console.log(err);
            response.json({ success: false, msg: 'Image couldn\'t be uploaded' });
        } else response.json({ success: true, msg: 'Image added successfully' });
    });
}


const favourites = async (request, response) => {
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
                        'SELECT "openedOffers".id, "openedOffers".name, "openedOffers".sex, "openedOffers".race, "openedOffers"."TypeName" FROM "openedOffers" WHERE "openedOffers"."idOwner"<>$1 and NOT EXISTS (SELECT * FROM seen WHERE seen."idOffer"="openedOffers".id and seen."idUser"=$1) and EXISTS (SELECT * FROM favourites WHERE favourites."idOffer"="openedOffers".id and favourites."idUser"=$1);',
                        [result.rows[0].id], (err, res) => {
                            if (err || res.rowCount == 0) {
                                console.log(err)
                                response.json({ success: false, msg: 'No offers found' });
                            } else {
                                response.json({ success: true, msg: 'Offers found', offers: res.rows });
                            }
                        });
                }
            });
        done();
    })
}

const deleteSeenOffers = async (request, response) => {
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
                        'DELETE FROM seen WHERE seen."idUser"=$1;',
                        [result.rows[0].id], (err, res) => {
                            if (err || res.rowCount == 0) {
                                console.log(err)
                                response.json({ success: false, msg: 'No offers found' });
                            } else {
                                client.query('COMMIT');
                                response.json({ success: true, msg: 'Offers deleted', offers: res.rows });
                            }
                        });
                }
            });
        done();
    })
};

const offerDetails = async (request, response) => {
    const { id: idOffer } = request.params;
    await pool.connect(async (err, client, done) => {
        if (err) {
            response.json({ success: false, msg: 'Error accessing the database' });
            done();
            return;
        }
        await client.query('BEGIN');
        await client.query(
            'SELECT "openedOffers".id, "openedOffers"."name", "openedOffers"."age", "openedOffers".description, "openedOffers".sex, race."raceName", species."speciesName", users.name AS "userName" FROM "openedOffers", race, species, users WHERE "openedOffers".id = $1 and "openedOffers"."idOwner"=users.id and "openedOffers".race=race."idRace" and race."idSpecies"=species.id;', [idOffer],
            (err, result) => {
                if (err || result.rowCount == 0) {
                    console.log(err)
                    response.json({ success: false, msg: 'Offer doesn\'t exist' });
                } else {
                    response.json({ success: true, msg: 'Offer', offer: result.rows[0] });
                }
            });
        done();
    })
}

const racesList = async (request, response) => {
    await pool.connect(async (err, client, done) => {
        if (err) {
            response.json({ success: false, msg: 'Error accessing the database' });
            done();
            return;
        }
        await client.query('BEGIN');
        await client.query(
            'SELECT species.id AS "idSpecies", species."speciesName", race."idRace", race."raceName" FROM species, race WHERE species.id=race."idSpecies" ORDER BY species.id, race."idRace";', (err, result) => {
                if (err || result.rowCount == 0) {
                    console.log(err)
                    response.json({ success: false, msg: 'No offers found' });
                } else {
                    response.json({ success: true, msg: 'Races list', list: result.rows });
                }
            });
        done();
    });
}

module.exports = {
    getOffers,
    createOffer,
    updateOffer,
    deleteOffer,
    myOffers,
    swipe,
    getImage,
    uploadImage,
    favourites,
    offerDetails,
    deleteSeenOffers,
    racesList
}
