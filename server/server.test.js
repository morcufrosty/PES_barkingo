const server = require('./routes');
const express = require('express');
const moxios = require('moxios');
const request = require('supertest');

const initServer = () => {
    const app = express();
    app.use('/api', server);
    return app;
};

describe('Root path', () => {
    test('It should respond the greetings message', async () => {
        const response = await request(initServer()).get('/api');
        expect(response.body.message).toBe('Welcome to the Barkingo API!');
    });
});

describe('POST /api/register', () => {
    test('It should response the GET method', async () => {
        const response = await request(initServer())
            .post('/api/register')
            .send({ password: 'test', email: 'mail@mail.com', name: 'Test Account' });
        expect(response.body.result).toBe(true);
    });
});
