// const mongoose = require('mongoose');
const { connectDB, dropDB, dropCollections } = require('../config/testDb');
const Todo = require('../models/todoModel');
const User = require('../models/userModel');

let testUser = {};
const validUser = {
  name: 'User',
  email: 'user@mail.com',
  password: '123456',
};
const validTodo = {
  title: 'Do the dishes',
  completed: false,
};

beforeAll(async () => {
  await connectDB();
});
afterAll(async () => {
  await dropDB();
});
beforeEach(async () => {
  testUser = await User.create(validUser);
});
afterEach(async () => {
  await dropCollections();
});

describe('Todo Model', () => {
  it('should create a todo item successfully', async () => {
    validTodo.user = testUser._id;
    const newTodo = await Todo(validTodo);
    await newTodo.save();
    expect(newTodo._id).toBeDefined();
    expect(newTodo.title).toBe(validTodo.title);
    expect(newTodo.completed).toBe(validTodo.completed);
  });
});
