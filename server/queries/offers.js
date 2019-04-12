const pool = require('./db');

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
            'SELECT "openedOffers".id, "openedOffers".name, "openedOffers".sex, "openedOffers".race, "openedOffers"."TypeName", "openedOffers"."urlImage" FROM "openedOffers", users WHERE users.name<>$1 and users.email<>$2 and "openedOffers"."idOwner" = users.id;',
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
    const { name, type, species, race, sex, age, description, iniDate, endDate } = request.body || request.query;
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
        await client.query('INSERT INTO animals (id, name, type, species, race, sex, age, description, iniDate, endDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [uuidv4(), name, type, species, race, sex, age, description, iniDate, endDate], (err, result) => {
            if (err) {
                console.error('Unknown error', err);
            } else {
                client.query('COMMIT');
                response.json({ success: true, msg: 'Offer created successfully' });
            }
        });
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
                    response.json({ success: true, offers: result.rows });
                }
            });
        done();
    })
}

module.exports = {
    getOffers,
    createOffer,
    myOffers
}
