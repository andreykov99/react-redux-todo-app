import axios from 'axios';

const API_URL = '/api/todos/';

//Get todos
const getTodos = async (userData) => {
  const response = await axios.get(API_URL, userData);
  return response.data;
};

// Add new todo
const addTodo = async () => {};

// Toggle todo completed
const toggleComplete = async () => {};

// Delete todo
const delTodo = async () => {};

const todoService = {
  getTodos,
  addTodo,
  toggleComplete,
  delTodo,
};

export default todoService;
