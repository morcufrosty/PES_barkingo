const server = require('./routes');
const express = require('express');
const moxios = require('moxios');
const request = require('supertest');

const initServer = () => {
    const app = express();
    app.use(server);
    return app;
};

describe('GET /api', () => {
    beforeEach(() => {
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall();
    });
    test('It ', async () => {
        moxios.stubRequest('/api', { message: 'Welcome to the Barkingo API!' });
        const app = initServer();
        await request(app).get('/api');
        expect(moxios.requests.mostRecent().message).toBe('Welcome to the Barkingo API!');
    });
});
