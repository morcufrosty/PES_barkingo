const pool = require('./db');
const uuidv4 = require('uuid/v4');
const fs = require('fs');
const path = require('path');
const homedir = require('os').homedir();
const imagesDir = '.images';

const currentUser = async (request, response) => {
    response.json({ success: false, msg: 'Not implemented yet currentUser' });
}

const getUser = async (request, response) => {
    response.json({ success: false, msg: 'Not implemented yet getUser' });
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
