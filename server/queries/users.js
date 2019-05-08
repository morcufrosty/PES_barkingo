const pool = require('./db');
const uuidv4 = require('uuid/v4');
const fs = require('fs');
const path = require('path');
const homedir = require('os').homedir();
const imagesDir = '.images';

const currentUser = async (request, response) => {
    const { email, name } = request.decoded;
    await pool.connect(async (err, client, done) => {
        if (err) {
            response.json({ success: false, msg: 'Error accessing the database' });
            done();
            return;
        }
        await client.query('BEGIN');
        await client.query('SELECT id, email, name FROM users WHERE email=$1 AND name=$2', [email, name], (err, result) => {
            if (err || result.rowCount == 0) {
                response.json({ success: false, msg: 'User not found' });
                done();
                return;
            } else {
                response.json({ success: true, id: result.rows[0].id, email: result.rows[0].email, name: result.rows[0].name });
                done();
                return;
            }
        })
    })
}

const getUser = async (request, response) => {
    //response.json({ success: false, msg: 'Not implemented yet getUser' });
    const { id: idUser } = request.params;
    await pool.connect(async (err, client, done) => {
        if (err) {
            response.json({ success: false, msg: 'Error accessing the database' });
            done();
            return;
        }
        await client.query('BEGIN');
        await client.query('SELECT id, email, name, bio, country, city FROM users WHERE id=$1', [idUser], (err, result) => {
            if (err || result.rowCount == 0) {
                console.log(err);
                response.json({ success: false, msg: 'User not found' });
            } else {
                response.json({ success: true, user: result.rows[0] });
            }
        });
        done();
        return;
    })
}

const createProfile = async (request, response) => {
    response.json({ success: false, msg: 'Not implemented yet createUser' });
}

const updateUser = async (request, response) => {
    response.json({ success: false, msg: 'Not implemented yet updateUser' });
}

const getUserImage = async (request, response) => {
    response.json({ success: false, msg: 'Not implemented yet getUserImage' });
}

const createUserImage = async (request, response) => {
    response.json({ success: false, msg: 'Not implemented yet createUserImage' });
}

module.exports = {
    currentUser,
    getUser,
    createProfile,
    updateUser,
    getUserImage,
    createUserImage
};
