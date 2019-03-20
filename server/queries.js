const Pool = require('pg').Pool;
const creds = require('./creds.json');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const pool = new Pool({
    // DB credentials i config
    user: creds.db.user,
    host: creds.db.host,
    database: creds.db.database,
    password: creds.db.password,
    port: creds.db.port,
});

const createUser = async (request, response) => {
    try {
        const { password, email, name } = request.query;
        const client = await pool.connect();
        await client.query('BEGIN');
        if (password === undefined) response.json({ result: 'error', msg: 'Password not defined' });
        let pwd = '';
        const f = async () => {
            await JSON.stringify(
                client.query('SELECT id FROM users WHERE email=$1', [email], (err, result) => {
                    if (result.rows[0]) {
                        response.json({ result: 'error', msg: 'User already exists' });
                    } else {
                        client.query('INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)', [uuidv4(), name, email, pwd], (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                client.query('COMMIT');
                                console.log(result);
                                response.json({ result: 'success', msg: 'User created successfully' });
                                return;
                            }
                        });
                    }
                })
            );
        };
        bcrypt.hash(password, 10, (err, hash) => {
            pwd = hash;
            f();
        });
        console.log(name, email, password, pwd);
    } catch (e) {
        console.log(e.stack);
    }
};

const loginUser = async (request, response) => {
    const { email, password } = request.body;
    loginAttempt();
    async function loginAttempt() {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            var currentAccountsData = await JSON.stringify(
                client.query('SELECT * FROM users WHERE email=$1', [email], (err, result) => {
                    if (err) {
                        response.json({ result: 'error', msg: 'error' });
                    }
                    if (result.rows[0] == null) {
                        response.json({ result: 'error', msg: 'Oops. Incorrect login details.' });
                    } else {
                        bcrypt.compare(password, result.rows[0].password, function(err, check) {
                            if (err) {
                                response.json({ result: 'error', msg: 'Error while checking password' });
                            } else if (check) {
                                response.json({ result: 'success', msg: { email: result.rows[0].email, name: result.rows[0].name } });
                            } else {
                                response.json({ result: 'error', msg: 'Oops. Incorrect login details.' });
                            }
                        });
                    }
                })
            );
        } catch (e) {
            throw e;
        }
    }
};

const renewGoogleToken = async (request, response) => {
    const { name, email, token } = request.query;
    loginAttempt();
    async function loginAttempt() {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            var currentAccountsData = await JSON.stringify(
                client.query('SELECT id, name, email, googleToken password FROM users WHERE email=$1', [email], (err, result) => {
                    if (err) {
                        response.json({ result: 'error', msg: 'error' });
                    }
                    if (result.rows.rowCount == 0) {
                        client.query('INSERT INTO users (id, name, email, googleToken) VALUES ($1, $2, $3, $4)', [uuidv4(), name, email, token], (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                client.query('COMMIT');
                                console.log(result);
                                response.json({ result: 'success', msg: 'User created successfully' });
                                return;
                            }
                        });
                    } else {
                        if (response.rows[0].googleToken) { // TODO: comparació tokens
                            if (err) {
                                response.json({ result: 'error', msg: 'Error while checking password' });
                            } else if (check) {
                                response.json({ result: 'success', msg: { email: result.rows[0].email, name: result.rows[0].name } });
                            } else {
                                response.json({ result: 'error', msg: 'Oops. Incorrect login details.' });
                            }
                        });
                    }
                })
            );
        } catch (e) {
            throw e;
        }
    }
};

const renewFacebookToken = async (request, response) => {
    const { name, email, token } = request.query;
    loginAttempt();
    async function loginAttempt() {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            var currentAccountsData = await JSON.stringify(
                client.query('SELECT id, name, email, password FROM users WHERE email=$1', [email], (err, result) => {
                    if (err) {
                        response.json({ result: 'error', msg: 'error' });
                    }
                    if (result.rows.rowCount == 0) {
                        client.query('INSERT INTO users (id, name, email, facebookToken) VALUES ($1, $2, $3, $4)', [uuidv4(), name, email, token], (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                client.query('COMMIT');
                                console.log(result);
                                response.json({ result: 'success', msg: 'User created successfully' });
                                return;
                            }
                        });
                    } else {
                        bcrypt.compare(password, result.rows[0].password, function(err, check) {
                            if (err) {
                                response.json({ result: 'error', msg: 'Error while checking password' });
                            } else if (check) {
                                response.json({ result: 'success', msg: { email: result.rows[0].email, name: result.rows[0].name } });
                            } else {
                                response.json({ result: 'error', msg: 'Oops. Incorrect login details.' });
                            }
                        });
                    }
                })
            );
        } catch (e) {
            throw e;
        }
    }
};

module.exports = {
    createUser,
    loginUser,
    renewGoogleToken,
    renewFacebookToken,
};

// ref: https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8
