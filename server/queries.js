const Pool = require('pg').Pool;
const pool = new Pool({
    // DB credentials i config
    user: '',
    host: '',
    database: '',
    password: '',
    port: 5432,
});

const createUser = (request, response) => {
    const { name, email } = request.body;

    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email])
        .then(res => {
            client.release();
            response.status(201).send(`User added with ID: ${result.insertId}`);
            console.log(res.rows[0]);
        })
        .catch(e => {
            client.release();
            console.log(err.stack);
        });
};

module.exports = {
    createUser,
};

// ref: https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8
