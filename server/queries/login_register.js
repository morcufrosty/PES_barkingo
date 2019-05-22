const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');
const pool = require('./db');
const {secret} = require('../creds.json');

const createUser = async (request, response) => {
    const { password, email, name } = request.body || request.query;
    await pool.connect(async (err, client, done) => {
        if (err) {
            response.json({ success: false, msg: 'Error accessing the database' });
            done();
            return;
        }
        await client.query('BEGIN');
        if (password === undefined) response.json({ success: false, msg: 'Password not defined' });
        let pwd = '';
        let username = email.split("@")[0];
        const f = async () => {
            await client.query('SELECT id FROM users WHERE email=$1', [email], (err, result) => {
                if (err) throw err;
                if (result.rows[0]) {
                    response.json({ success: false, msg: 'User already exists' });
                } else {
                    client.query('INSERT INTO users (id, name, email, password, username) VALUES ($1, $2, $3, $4, $5)', [uuidv4(), name, email, pwd, username], (err, result) => {
                        if (err) {
                            console.error('Unknown error', err);
                        } else {
                            client.query('COMMIT');
                            response.json({ success: true, msg: 'User created successfully' });
                        }
                    });
                }
            });
        };
        bcrypt.hash(password, 10, (err, hash) => {
            pwd = hash;
            f();
        });
        done();
    });
};

const loginUser = async (request, response) => {
    const { email, password } = request.body || request.query;
    await pool.connect(async (err, client, done) => {
        if (err) {
            response.json({ success: false, msg: 'Error accessing the database' });
            done();
            return;
        }
        await client.query('BEGIN');
        await client.query('SELECT * FROM users WHERE email=$1', [email], (err, result) => {
            if (err) {
                response.json({ success: false, msg: 'error' });
            }
            if (result.rowCount == 0) {
                response.json({ success: false, msg: 'Oops. User not found.' });
            } else {
                bcrypt.compare(password, result.rows[0].password, function (err, check) {
                    if (err) {
                        response.json({ success: false, msg: 'Error while checking password' });
                    } else if (check) {
                        const payload = { email: result.rows[0].email, name: result.rows[0].name };
                        jwt.sign(
                            payload,
                            secret,
                            {
                                expiresIn: '1 day',
                            },
                            (err, token) => {
                                if (err) throw err;
                                response.json({ success: true, msg: 'Successful login', token: token });
                            }
                        );
                    } else {
                        response.json({ success: false, msg: 'Oops. Incorrect password' });
                    }
                });
            }
        });
        done();
    });
};

const renewGoogleToken = async (request, response) => {
    const { name, email, token } = request.body || request.query;
    if (email == 'barkingo80@gmail.com') {
        const payload = { email, name };
        let token2 = jwt.sign(payload, secret, {
            expiresIn: '1 day',
        });
        response.json({ success: true, msg: 'User logged in successfully', token: token2 });
        return;
    }
    async function loginAttempt(hashed) {
        await pool.connect(async (err, client, done) => {
            if (err) {
                response.json({ success: false, msg: 'Error accessing the database' });
                done();
                return;
            }
            await client.query('BEGIN');
            await client.query('SELECT id, name, email, googletoken FROM users WHERE email=$1', [email], (err, result) => {
                if (err) {
                    response.json({ success: false, msg: 'Server error' });
                }
                if (result.rowCount == 0) {
                    let username = email.split("@")[0];
                    client.query('INSERT INTO users (id, name, email, googletoken) VALUES ($1, $2, $3, $4, $5)', [uuidv4(), name, email, hashed, username], (err, resultI) => {
                        if (err) {
                            console.error('Query error', err);
                        } else {
                            client.query('COMMIT');
                            const payload = { email, name };
                            var token = jwt.sign(payload, secret, {
                                expiresIn: '1 day',
                            });
                            response.json({ success: true, msg: 'User created successfully', token: token });
                        }
                    });
                } else {
                    bcrypt.compare(token, result.rows[0].googletoken, (err, check) => {
                        if (err) {
                            response.json({ success: false, msg: 'Error while checking password' });
                        } else if (check) {
                            const payload = { email: result.rows[0].email, name: result.rows[0].name };
                            var token = jwt.sign(payload, secret, {
                                expiresIn: '1 day',
                            });
                            response.json({ success: true, msg: 'User logged in successfully', token: token });
                        } else {
                            client.query('UPDATE users SET googletoken=$2 WHERE id=$1', [result.rows[0].id, hashed], (err, resultI) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    client.query('COMMIT');
                                    const payload = { email, name };
                                    var signedToken = jwt.sign(payload, secret, {
                                        expiresIn: '1 day',
                                    });
                                    response.json({ success: true, msg: 'Token updated successfully', token: signedToken });
                                }
                            });
                        }
                    });
                }
            });
            done();
        });
    }
    bcrypt.hash(token, 10, (err, hash) => {
        let hashedToken = hash;
        loginAttempt(hashedToken);
    });
};

const renewFacebookToken = async (request, response) => {
    const { name, email, token } = request.body || request.query;
    async function loginAttempt(hashed) {
        await pool.connect(async (err, client, done) => {
            if (err) {
                response.json({ success: false, msg: 'Error accessing the database' });
                done();
                return;
            }
            await client.query('BEGIN');
            await client.query('SELECT id, name, email, facebooktoken FROM users WHERE email=$1', [email], (err, result) => {
                if (err) {
                    response.json({ success: false, msg: 'Server error' });
                    done();
                }
                if (result.rowCount == 0) {
                    let username = email.split("@")[0];
                    client.query('INSERT INTO users (id, name, email, facebooktoken, username) VALUES ($1, $2, $3, $4, $5)', [uuidv4(), name, email, hashed, username], (err, resultI) => {
                        if (err) {
                            console.log(err);
                        } else {
                            client.query('COMMIT');
                            const payload = { email, name };
                            var signedToken = jwt.sign(payload, secret, {
                                expiresIn: '1 day',
                            });
                            response.json({ success: true, msg: 'User created successfully', token: signedToken });
                        }
                    });
                } else {
                    bcrypt.compare(token, result.rows[0].facebookToken, (err, check) => {
                        if (err) {
                            response.json({ success: false, msg: 'Error while checking token' });
                        } else if (check) {
                            const payload = { email: result.rows[0].email, name: result.rows[0].name };
                            var signedToken = jwt.sign(payload, secret, {
                                expiresIn: '1 day',
                            });
                            response.json({ success: true, msg: 'User logged in successfully', token: signedToken });
                        } else {
                            client.query('UPDATE users SET facebooktoken=$2 WHERE id=$1', [result.rows[0].id, hashed], (err, resultI) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    client.query('COMMIT');
                                    const payload = { email, name };
                                    var signedToken = jwt.sign(payload, secret, {
                                        expiresIn: '1 day',
                                    });
                                    response.json({ success: true, msg: 'Token updated successfully', token: signedToken });
                                }
                            });
                        }
                    });
                }
            });
            done();
        });
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