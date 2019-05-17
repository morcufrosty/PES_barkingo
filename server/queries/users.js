const pool = require('./db');
const uuidv4 = require('uuid/v4');
const fs = require('fs');
const path = require('path');
const homedir = require('os').homedir();
const imagesDir = '.users';

const currentUser = async (request, response) => {
    const { email, name } = request.decoded;
    await pool.connect(async (err, client, done) => {
        if (err) {
            response.json({ success: false, msg: 'Error accessing the database' });
            done();
            return;
        }
        await client.query('BEGIN');
        await client.query('SELECT id, email, name, username, bio, latitude, longitude FROM users WHERE email=$1 AND name=$2', [email, name], (err, result) => {
            if (err || result.rowCount == 0) {
                response.json({ success: false, msg: 'User not found' });
                done();
                return;
            } else {
                response.json({ success: true, user: result.rows[0] });
                done();
                return;
            }
        })
    })
}

const getUser = async (request, response) => {
    //response.json({ success: false, msg: 'Not implemented yet getUser' });
    const { email, name } = request.decoded;
    const { id: idUser } = request.params;
    await pool.connect(async (err, client, done) => {
        if (err) {
            response.json({ success: false, msg: 'Error accessing the database' });
            done();
            return;
        }
        await client.query('BEGIN');
        await client.query('SELECT id, email, username, name, bio, latitude, longitude FROM users WHERE id=$1', [idUser], (err, result) => {
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
    //response.json({ success: false, msg: 'Not implemented yet createUser' });
    const { email, name } = request.decoded;
    const { id: idUser } = request.params;
    const { bio, latitude, longitude } = request.body || request.query;
    await pool.connect(async (err, client, done) => {
        if (err) {
            response.json({ success: false, msg: 'Error accessing the database' });
            done();
            return;
        }
        await client.query('BEGIN');
        await client.query(
            'SELECT id FROM users WHERE email=$1 AND name=$2;', [email, name],
            (err, result) => {
                if (err || result.rowCount == 0) {
                    console.log(err)
                    response.json({ success: false, msg: 'User ' + email + ' doesn\'t exist' });
                } else {
                    if(result.rows[0].id == idUser) {
                        client.query(
                            'UPDATE users SET bio=$1, latitude=$2, longitude=$3 WHERE id=$4;)',
                            [bio, latitude, longitude, idUser],
                            (error, res) => {
                                if (error) {
                                    console.error('Unknown error', error);
                                    response.json({ success: false, msg: 'Unknown error' });
                                } else {
                                    client.query('COMMIT');
                                    response.json({ success: true, msg: 'Profile created successfully', id: idUser });
                                }
                        });
                    }
                    else {
                        response.json({ success: false, msg: 'No authorized for operation' });
                    }
                }
            });
        done();
    })
}

const updateUser = async (request, response) => {
    //response.json({ success: false, msg: 'Not implemented yet updateUser' });
    const { email, name } = request.decoded;
    const { id: idUser } = request.params;
    const { username, bio, latitude, longitude } = request.body || request.query;
    await pool.connect(async (err, client, done) => {
        if (err) {
            response.json({ success: false, msg: 'Error accessing the database' });
            done();
            return;
        }
        await client.query('BEGIN');
        await client.query(
            'SELECT id FROM users WHERE email=$1 AND name=$2;', [email, name],
            (err, result) => {
                if (err || result.rowCount == 0) {
                    console.log(err)
                    response.json({ success: false, msg: 'User ' + email + ' doesn\'t exist' });
                } else {
                    if(result.rows[0].id == idUser) {
                        client.query(
                            'UPDATE users SET username=$1, bio=$2, latitude=$3, longitude=$4 WHERE id=$5;',
                            [username, bio, latitude, longitude, idUser],
                            (error, res) => {
                                if (error) {
                                    console.error('Unknown error', error);
                                    response.json({ success: false, msg: 'Unknown error' });
                                } else {
                                    client.query('COMMIT');
                                    response.json({ success: true, msg: 'Profile updated successfully', id: idUser });
                                }
                        });
                    }
                    else {
                        response.json({ success: false, msg: 'No authorized for operation' });
                    }
                }
            });
        done();
    })
}

const deleteUser = async (request, response) => {
    //response.json({ success: false, msg: 'Not implemented yet getUserImage' });
    const { email, name } = request.decoded;
    const { id: idUser } = request.params;
    await pool.connect(async (err, client, done) => {
        if (err) {
            response.json({ success: false, msg: 'Error accessing the database' });
            done();
            return;
        }
        await client.query('BEGIN');
        await client.query(
            'SELECT id FROM users WHERE email=$1 AND name=$2;', [email, name],
            (err, result) => {
                if (err || result.rowCount == 0) {
                    console.log(err)
                    response.json({ success: false, msg: 'User ' + email + ' doesn\'t exist' });
                } else {
                    if(result.rows[0].id == idUser) {
                        client.query(
                        'DELETE FROM users WHERE "id"=$1;', [idUser],
                        (error, res) => {
                            if (error) {
                                console.error('Unknown error', error);
                                response.json({ success: false, msg: 'Unknown error' });
                            } else {
                                client.query('COMMIT');
                                response.json({ success: true, msg: 'User deleted successfully', id: idUser });
                            }
                        });
                    }
                    else {
                        response.json({ success: false, msg: 'No authorized for operation' });
                    }
                }
            });
        done();
    })
}

const getUserImage = async (request, response) => {
    const { id: idUser } = request.params;
    fs.readFile(path.join(homedir, imagesDir, idUser + '.jpg'), (err, data) => {
        if (err) {
            console.error(err);
            response.status(404);
            response.json({ success: false, msg: 'Image couldn\'t be found' });
        } else {
            const img = new Buffer.from(data).toString('base64');
            response.writeHead(200, {
                // 'Content-Type': 'image/jpeg',
                'Content-Length': img.length
            });
            response.end(img);
        }
    });
}

const createUserImage = async (request, response) => {
    const { id: idUser } = request.params;
    const image = request.files.image;

    require("fs").writeFile(path.join(homedir, imagesDir, idUser + '.jpg'), image.data, (err) => {
        if (err) {
            console.log(err);
            response.json({ success: false, msg: 'Image couldn\'t be uploaded' });
        } else response.json({ success: true, msg: 'Image added successfully' });
    });
}

module.exports = {
    currentUser,
    getUser,
    createProfile,
    updateUser,
    deleteUser,
    getUserImage,
    createUserImage
};
