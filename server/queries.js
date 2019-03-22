const Pool = require('pg').Pool;
const creds = require('./creds.json');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');
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
        const { password, email, name } = request.body;
        const client = await pool.connect();
        await client.query('BEGIN');
        if (password === undefined) response.json({ success: false, msg: 'Password not defined' });
        let pwd = '';
        const f = async () => {
            await JSON.stringify(
                client.query('SELECT id FROM users WHERE email=$1', [email], (err, result) => {
                    if (result.rows[0]) {
                        response.json({ success: false, msg: 'User already exists' });
                    } else {
                        client.query('INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)', [uuidv4(), name, email, pwd], (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                client.query('COMMIT');
                                console.log(result);
                                response.json({ success: true, msg: 'User created successfully' });
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
                        response.json({ success: false, msg: 'error' });
                    }
                    if (result.rowCount == 0) {
                        response.json({ success: false, msg: 'Oops. User not found.' });
                    } else {
                        bcrypt.compare(password, result.rows[0].password, function(err, check) {
                            if (err) {
                                response.json({ success: false, msg: 'Error while checking password' });
                            } else if (check) {
                                const payload = { email: result.rows[0].email, name: result.rows[0].name };
                                var token = jwt.sign(payload, creds.secret, {
                                    expiresIn: 1440, // expires in 1 week
                                });
                                response.json({ success: true, msg: 'Successful login', token: token });
                            } else {
                                response.json({ success: false, msg: 'Oops. Incorrect password' });
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
    const { name, email, token } = request.body;
    async function loginAttempt(hashed) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            await client.query('SELECT id, name, email, googletoken FROM users WHERE email=$1', [email], (err, result) => {
                console.log(result);
                if (err) {
                    response.json({ success: false, msg: 'Server error' });
                }
                if (result.rowCount == 0) {
                    client.query('INSERT INTO users (id, name, email, googletoken) VALUES ($1, $2, $3, $4)', [uuidv4(), name, email, hashed], (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            client.query('COMMIT');
                            console.log(result);
                            response.json({ success: true, msg: 'User created successfully' });
                            return;
                        }
                    });
                } else {
                    bcrypt.compare(token, result.rows[0].googletoken, (err, check) => {
                        if (err) {
                            response.json({ success: false, msg: 'Error while checking password' });
                        } else if (check) {
                            response.json({ success: true, msg: { email: result.rows[0].email, name: result.rows[0].name } });
                        } else {
                            response.json({ success: false, msg: 'Oops. Incorrect token' });
                        }
                    });
                }
            });
        } catch (e) {
            throw e;
        }
    }
    bcrypt.hash(token, 10, (err, hash) => {
        let hashedToken = hash;
        loginAttempt(hashedToken);
    });
};

const renewFacebookToken = async (request, response) => {
    const { name, email, token } = request.body;
    async function loginAttempt(hashed) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            await client.query('SELECT id, name, email, facebooktoken FROM users WHERE email=$1', [email], (err, result) => {
                if (err) {
                    response.json({ success: false, msg: 'Server error' });
                }
                if (result.rowCount == 0) {
                    client.query('INSERT INTO users (id, name, email, facebooktoken) VALUES ($1, $2, $3, $4)', [uuidv4(), name, email, hashed], (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            client.query('COMMIT');
                            console.log(result);
                            response.json({ success: false, msg: 'User created successfully' });
                            return;
                        }
                    });
                } else {
                    bcrypt.compare(token, result.rows[0].facebookToken, (err, check) => {
                        if (err) {
                            response.json({ success: false, msg: 'Error while checking password' });
                        } else if (check) {
                            response.json({ success: true, msg: { email: result.rows[0].email, name: result.rows[0].name } });
                        } else {
                            response.json({ success: false, msg: 'Oops. Incorrect token' });
                        }
                    });
                }
            });
        } catch (e) {
            throw e;
        }
    }
    bcrypt.hash(token, 10, (err, hash) => {
        let hashedToken = hash;
        loginAttempt(hashedToken);
    });
};

module.exports = {
    createUser,
    loginUser,
    renewGoogleToken,
    renewFacebookToken,
};

// ref: https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8
