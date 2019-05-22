const pool = require('./db');
const uuidv4 = require('uuid/v4');
const fs = require('fs');
const path = require('path');
const homedir = require('os').homedir();
const imagesDir = '.images';

var toType = function (obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

const getOffers = async (request, response) => {
    const { email, name } = request.decoded;
    let { sex = null, type = null, species = null, radius = null, minAge = null, maxAge = null } = request.query || request.body;
    if (minAge) minAge = parseInt(minAge);
    if (maxAge) maxAge = parseInt(maxAge);
    if (species) species = parseInt(species);
    let query = 'SELECT "openedOffers".id, "openedOffers".name, "openedOffers".sex, "openedOffers".race, "openedOffers"."TypeName", race."idSpecies", "openedOffers".age FROM "openedOffers", race WHERE "openedOffers"."idOwner"<>$1 and "openedOffers".race=race."idRace" and NOT EXISTS (SELECT * FROM seen WHERE seen."idOffer"="openedOffers".id and seen."idUser"=$1) and NOT EXISTS (SELECT * FROM favourites WHERE favourites."idOffer"="openedOffers".id and favourites."idUser"=$1) '
        + 'and ($2::varchar IS NULL or "openedOffers".sex=$2::varchar) and ($3::varchar IS NULL or "openedOffers"."TypeName"=$3::varchar) '
        + 'and ($4::int IS NULL or race."idSpecies"=$4) and ($5::int IS NULL or $5::int >= (SELECT ((ACOS(SIN($8::float * PI() / 180) * SIN(users.latitude * PI() / 180) + COS($8::float * PI() / 180) * COS(users.latitude * PI() / 180) * COS(($9::float - users.longitude) * PI() / 180)) * 180 / PI()) * 60 * 1.1515) * 1.609344 FROM users WHERE users.id="openedOffers"."idOwner" AND users.latitude IS NOT NULL AND users.longitude IS NOT NULL)) '
        + 'and ($6::int IS NULL or "openedOffers".age>=$6::int) and ($7::int IS NULL or "openedOffers".age<=$7::int);'
    await pool.connect(async (err, client, done) => {
        if (err) {
            response.json({ success: false, msg: 'Error accessing the database' });
            done();
            return;
        }
        await client.query('BEGIN');
        await client.query(
            'SELECT id, latitude, longitude FROM users WHERE email=$1 AND name=$2;', [email, name],
            (err, result) => {
                if (err || result.rowCount == 0) {
                    console.log(err)
                    response.json({ success: false, msg: 'User ' + email + ' doesn\'t exist' });
                } else {
                    if (radius != null && (result.rows[0].latitude == null || result.rows[0].longitude == null)) {
                        response.json({ success: false, msg: 'You can\'t filter by radius if you haven\'t set your coordinates' });
                    } else {
                        client.query(
                            query,
                            [result.rows[0].id, sex, type, species, radius, minAge, maxAge, result.rows[0].latitude, result.rows[0].longitude], (err, res) => {
                                if (err || res.rowCount == 0) {
                                    console.log(err);
                                    response.json({ success: false, msg: 'No offers found' });
                                } else {
                                    response.json({ success: true, msg: 'Offers found', offers: res.rows.slice(0, 10) });
                                }
                            });
                    }
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
                    console.error(err)
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
    const { email, name: userName } = request.decoded;
    const { id: idOffer } = request.params;
    let { name = null, type = null, race = null, sex = null, age = null, description = '', iniDate = null, endDate = null } = request.body || request.query;
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
                    let idOwn = result.rows[0].id
                    client.query('SELECT id FROM animals WHERE id=$1', [idOffer], (error, res) => {
                        if (error || res.rowCount == 0) {
                            console.log(err)
                            response.json({ success: false, msg: 'Offer ' + idOffer + ' doesn\'t exist' });
                        } else {
                            client.query(
                                'UPDATE animals SET name=$1, offer=$2, race=$3, sex=$4, age=$5, description=$6 WHERE id=$7 and animals."idOwner"=$8;', [name, type, race, sex, age, description, idOffer, idOwn],
                                (error, res) => {
                                    if (error || res.rowCount == 0) {
                                        console.error('Unknown error', error, ' or no rows were updated', res);
                                        response.json({ success: false, msg: 'No rows were updated or server error' });
                                    } else {
                                        client.query('COMMIT');
                                        response.json({ success: true, msg: 'Offer updated successfully', id: idOffer });
                                    }
                                });
                        }
                    });
                }
            });
        done();
    })
}

const deleteOffer = async (request, response) => {
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
                    client.query(
                        'DELETE FROM favourites WHERE "idOffer"=$1;', [idOffer],
                        (error, res) => {
                            if (error) {
                                console.error('Unknown error', error);
                                response.json({ success: false, msg: 'Unknown error' });
                            } else {
                                client.query('COMMIT');
                                response.json({ success: true, msg: 'Offer deleted from favourites successfully', id: idOffer });
                            }
                        });
                }
            });
        done();
    })
}

/*
const eliminateOffer = async (request, response) => {
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
                        'DELETE FROM animals WHERE id=$1;', [idOffer],
                        (error, res) => {
                            if (error) {
                                console.error('Unknown error', error);
                            } else {
                                client.query('COMMIT');
                                response.json({ success: true, msg: 'Offer eliminated successfully', id: idOffer });
                            }
                        });
                }
            });
        done();
    })
}*/

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
            'SELECT "openedOffers".id, "openedOffers".name, "openedOffers".sex, "openedOffers".race, "openedOffers"."TypeName" FROM "openedOffers", users WHERE users.name=$1 and users.email=$2 and "openedOffers"."idOwner" = users.id;',
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
                    console.log(err);
                    response.status(404);
                    response.json({ success: false, msg: 'User doesn\'t exist' });
                } else {
                    client.query(
                        'SELECT "openedOffers".id FROM "openedOffers" WHERE "openedOffers".id=$1;', [idOffer],
                        (err, result2) => {
                            if (err || result2.rowCount == 0) {
                                console.log(err)
                                response.status(404);
                                response.json({ success: false, msg: 'Offer doesn\'t exist' });
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
                    )
                }
            }
        );
        done();
    })
}

const getImage = async (request, response) => {
    const { id: idOffer } = request.params;
    fs.readFile(path.join(homedir, imagesDir, idOffer + '.jpg'), (err, data) => {
        if (err) {
            console.error(err);
            response.status(404);
            response.json({ success: false, msg: 'Image couldn\'t be found' });
        } else {
            const img = new Buffer.from(data).toString('base64');
            response.writeHead(200, {
                // 'Content-Type': 'image/jpeg',
                'Content-Length': img.length
            });
            response.end(img);
        }
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

const unfavourite = async (request, response) => {
    //response.json({ success: false, msg: 'Not implemented yet unfavourite' });
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
            (err, result) => {
                if (err || result.rowCount == 0) {
                    console.log(err)
                    response.json({ success: false, msg: 'User ' + email + ' doesn\'t exist' });
                } else {
                    let idUser = result.rows[0].id;
                    client.query(
                        'DELETE FROM favourites WHERE "idOffer"=$1 AND "idUser"=$2;', [idOffer, idUser],
                        (error, res) => {
                            if (error) {
                                console.error('Unknown error', error);
                                response.json({ success: false, msg: 'Unknown error' });
                            } else {
                                client.query('COMMIT');
                                response.json({ success: true, msg: 'Offer deleted from favourites successfully', id: idOffer });
                            }
                        });
                    client.query(
                        'INSERT INTO seen ("idUser", "idOffer") VALUES ($1, $2);', [idUser, idOffer],
                        (err, result) => {
                            if (err) {
                                console.log(err)
                                response.json({ success: false, msg: 'Offer is already in seen or an error occured' });
                            } else {
                                client.query('COMMIT');
                                response.json({ success: true, msg: 'Offer added to seen' });
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
            'SELECT "openedOffers".id, "openedOffers"."name", "openedOffers"."age", "openedOffers".description, "openedOffers".sex, race."raceName", species."speciesName" AS "species", race."idRace", users.id AS "idOwner" FROM "openedOffers", race, species, users WHERE "openedOffers".id = $1 and "openedOffers"."idOwner"=users.id and "openedOffers".race=race."idRace" and race."idSpecies"=species.id;', [idOffer],
            (err, result) => {
                if (err || result.rowCount == 0) {
                    console.log(err);
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
    //eliminateOffer,
    myOffers,
    swipe,
    getImage,
    uploadImage,
    favourites,
    unfavourite,
    offerDetails,
    deleteSeenOffers,
    racesList
};
