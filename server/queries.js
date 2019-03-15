const Pool = require('pg').Pool;
const creds = require('./creds.json');
const bcrypt = require('bcrypt')
const uuidv4 = require('uuid/v4');
const pool = new Pool({
    // DB credentials i config
    ...creds.db,
});

const createUser = (request, response) => {
    try {
        const { password, username, name } = request.body;
        const client = await pool.connect();
        await client.query('BEGIN');
        const pwd = await bcrypt.hash(password, 5);
        await JSON.stringify(client.query('SELECT id FROM "users" WHERE "email"=$1', [username],
            (err, result) => {
                if (result.rows[0]) {
                    response.json({'result': 'error', 'msg': 'User already exists'});
                } else {
                    client.query('INSERT INTO users (id, "firstName", "lastName", email, password) VALUES ($1, $2, $3, $4)', [uuidv4(), name, username, pwd],
                        (err, result) => {
                            if (err){
                                console.log(err);
                            } else {
                                client.query('COMMIT');
                                console.log(result);
                                response.json({'result': 'success', 'msg': 'User created successfully'});
                                return;
                            }
                        });
                }
            }));
    } catch (e) {
        console.log(e.stack)
    }
};

module.exports = {
    createUser,
};

// ref: https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8
