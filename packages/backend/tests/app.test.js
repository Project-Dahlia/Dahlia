const supertest = require('supertest');
const app = require('../src/app');
const api = supertest(app);

describe('Test the home path', () => {
  test('It should respond with 200 OK', async () => {
    const response = await api.get('/api/v1');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Home route is working!');
  });

  test('It should respond with 201 Created and return test data', async () => {
    const response = await api
      .post('/api/v1/test')
      .send({
        firstName: 'John',
        lastName: 'Doe'
      })
      .expect('Content-Type', /application\/json/);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Test created successfully!');

    expect(response.body.test).toHaveProperty('firstName', 'John');
    expect(response.body.test).toHaveProperty('lastName', 'Doe');
  });
});
