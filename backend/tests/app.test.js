const request = require('supertest');
const express = require('express');
const homeRouter = require('../src/routes/home-route');

const app = express();
app.use('/', homeRouter);

describe('Test the home path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(201);
    expect(response.text).toBe('Home route is working!');
  });
});
