const dotenv = require('dotenv').config();
const request = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = require('../app');
const { connectDB, dropDB, dropCollections } = require('../config/testDb');
const User = require('../models/userModel');
const api = '/api/users';

beforeAll(async () => {
  await connectDB();
});
afterAll(async () => {
  await dropDB();
});

afterEach(async () => {
  await dropCollections();
});

describe('Test User Routes', () => {
  const userRegistrationData = {
    name: 'User',
    email: 'user@mail.com',
    password: '123456',
  };
  const userLoginData = {
    email: 'user@mail.com',
    password: '123456',
  };
  describe('POST /', () => {
    it('Empty request', async () => {
      const response = await request(app).post(`${api}/`);
      expect(response.statusCode).toBe(400);
    });
    it('Partial data', async () => {
      const response = await request(app)
        .post(`${api}/`)
        .send({ name: 'User', email: 'user@mail.com' });
      expect(response.statusCode).toBe(400);
    });
    it('User registration', async () => {
      const response = await request(app)
        .post(`${api}/`)
        .send(userRegistrationData);
      expect(response.statusCode).toBe(201);
    });
    it('User exists', async () => {
      await User.create(userRegistrationData);
      const response = await request(app)
        .post(`${api}/`)
        .send(userRegistrationData);
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('User already exists');
    });
  });
  describe('POST /login', () => {
    it('Empty request', async () => {
      const response = await request(app).post(`${api}/login`);
      expect(response.statusCode).toBe(400);
    });
    it('Partial data request', async () => {
      const response = await request(app)
        .post(`${api}/login`)
        .send({ email: userLoginData.email });
      expect(response.statusCode).toBe(400);
    });
    it('User login', async () => {
      const salt = await bcrypt.genSalt(10);
      userRegistrationData.password = await bcrypt.hash(
        userRegistrationData.password,
        salt
      );
      await User.create(userRegistrationData);
      const response = await request(app)
        .post(`${api}/login`)
        .send(userLoginData);
      expect(response.statusCode).toBe(200);
    });
  });
  describe('GET /profile', () => {
    it('Not authorized', async () => {
      const response = await request(app).get(`${api}/profile`);
      expect(response.statusCode).toBe(401);
    });
    it('Get user profile', async () => {
      const testUser = await User.create(userRegistrationData);
      const token = jwt.sign({ id: testUser._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });
      const response = await request(app)
        .get(`${api}/profile`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
    });
  });
});
