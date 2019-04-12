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

module.exports = {
    getOffers,
}