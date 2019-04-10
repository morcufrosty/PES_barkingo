const Pool = require('pg').Pool;
const creds = require('../creds.json');

const pool = new Pool({
    // DB credentials i config
    user: creds.db.user,
    host: creds.db.host,
    database: creds.db.database,
    password: creds.db.password,
    port: creds.db.port,
});

module.exports = pool