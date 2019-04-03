const server = require('./routes');
const express = require('express');
const request = require('supertest');
var bodyParser = require('body-parser');

const initServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use('/api', server);
    return app;
};

afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});

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
            .send({ password: 'test', email: 'mail@mail.com', name: 'Test Account' })
            .set('Accept', /application\/json/)
            .type('form')
        expect(response.body.success).toBe(false);
    });
});
