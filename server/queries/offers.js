const pool = require('./db');

const getOffers = (request, response) => {
    const { id } = request.body || request.query;
    await pool.connect(async (err, client, done) => {
        if (err) {
            response.json({ success: false, msg: 'Error accessing the database' });
            done();
            return;
        }
        await client.query('BEGIN');
        await client.query('SELECT id, name, race, sex, description, status, offerType, urlImage, FROM ', [id], (err, result) => {
            if (err || result.rowCount == 0) {
                response.json({ success: false, msg: 'No offers found found' });
                done();
                return;
            } else {
                response.json({ offerList: result.rows });
            }
        });
    })
}

const createOffer = (request, response) => {
    const { name, type, species, race, sex, age, description, iniDate, endDate } = request.body || request.query;
    await pool.connect(async (err, client, done) => {
        if (err) {
            response.json({ success: false, msg: 'Error accessing the database' });
            done();
            return;
        }
        await client.query('BEGIN');
        if(description === undefined) description = "null";
        if(iniDate === undefined) iniDate = "null";
        if(endDate === undefined) endDate = "null";
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

module.exports = {
    getOffers,
    createOffer,
}
