import axios from 'axios';

const API_URL = '/api/todos/';

const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    // For Spring Boot back-end
    return { Authorization: 'Bearer ' + user.token };

    // for Node.js Express back-end
    // return { 'x-access-token': user.accessToken };
  } else {
    return {};
  }
};

//Get todos
const getTodos = async () => {
  const response = await axios.get(API_URL, { headers: authHeader() });
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
