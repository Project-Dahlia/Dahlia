const supertest = require('supertest');
const app = require('../src/app');
const api = supertest(app);
const jwt = require('jsonwebtoken');
const User = require('../src/models/user');
const sequelize = require('../src/config/database');
const moment = require('moment');
const nodemailer = require('nodemailer');

// Mock jwt
jest.mock('jsonwebtoken');

// Mock nodemailer
jest.mock('nodemailer');
const sendMailMock = jest.fn();
nodemailer.createTransport.mockReturnValue({
  sendMail: sendMailMock
});

describe('Password Reset Functionality', () => {
  let resetToken;
  let testUser;

  beforeAll(async () => {
    // Connect to the database
    await sequelize.authenticate();
    // Sync the database schema
    await sequelize.sync({ force: true });

    // Create a test user
    testUser = await User.create({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'initialPassword',
      resetPasswordToken: 'mocked-reset-token' // Pre-assign a reset token
    });

    // Mock jwt.verify to always return the test user id
    resetToken = 'mocked-reset-token';
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, { userId: testUser.id });
    });
  });

  afterAll(async () => {
    // Clean up: delete the test user
    await User.destroy({ where: { id: testUser.id } });
    // Close the database connection after tests
    await sequelize.close();
  });

  test('It should request a password reset token and respond with 200 OK', async () => {
    sendMailMock.mockResolvedValueOnce({}); // Mock successful email sending

    const response = await api
      .post('/api/v1/auth/request-password-reset')
      .send({
        email: 'testuser@example.com' // Use the test user's email
      })
      .expect('Content-Type', /application\/json/);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(
      'An email has been sent to testuser@example.com with further instructions.'
    );
    expect(sendMailMock).toHaveBeenCalledTimes(1); // Verify that sendMail was called
  }, 20000);

  test('It should reset the password with a valid token and respond with 200 OK', async () => {
    const user = await User.findOne({
      where: { email: 'testuser@example.com' }
    });
    resetToken = user.resetPasswordToken;

    const response = await api
      .post('/api/v1/auth/reset-password')
      .send({
        token: resetToken,
        newPassword: 'newpassword123'
      })
      .expect('Content-Type', /application\/json/);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Password has been reset successfully');
  }, 20000);

  test('It should respond with 400 Bad Request for invalid token', async () => {
    jwt.verify.mockImplementationOnce((token, secret, callback) => {
      callback(new Error('Invalid token'));
    });

    const response = await api
      .post('/api/v1/auth/reset-password')
      .send({
        token: 'invalid-token',
        newPassword: 'newpassword123'
      })
      .expect('Content-Type', /application\/json/);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      'Password reset token is invalid or has expired'
    );
  }, 20000);

  test('It should respond with 400 Bad Request for expired token', async () => {
    const user = await User.findOne({ where: { id: 1 } });
    user.resetPasswordExpires = moment();
    resetToken = user.resetPasswordToken;
    await user.save();

    const response = await api
      .post('/api/v1/auth/reset-password')
      .send({
        token: resetToken,
        newPassword: 'newpassword123'
      })
      .expect('Content-Type', /application\/json/);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      'Password reset token is invalid or has expired'
    );
  }, 20000);
});
