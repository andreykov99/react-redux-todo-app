// const mongoose = require('mongoose');
const { connectDB, dropDB, dropCollections } = require('../config/testDb');
const User = require('../models/userModel');

beforeAll(async () => {
  await connectDB();
});
afterAll(async () => {
  await dropDB();
});

afterEach(async () => {
  await dropCollections();
});

describe('User Model', () => {
  const validUser = {
    name: 'User',
    email: 'user@mail.com',
    password: '123456',
  };
  it('should create new user', async () => {
    const newUser = await User.create(validUser);
    expect(newUser._id).toBeDefined();
    expect(newUser.name).toBe(validUser.name);
    expect(newUser.email).toBe(validUser.email);
  });
});
