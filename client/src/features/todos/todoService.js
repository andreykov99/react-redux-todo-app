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
const addTodo = async ({ title }) => {
  const response = await axios.post(
    API_URL,
    { title },
    { headers: authHeader() }
  );
  return response.data;
};

// Toggle todo completed
const toggleComplete = async ({ id, completed }) => {
  const response = await axios.patch(
    `${API_URL}${id}`,
    { completed },
    {
      headers: authHeader(),
    }
  );
  return response.data;
};

// Delete todo
const deleteTodo = async ({ id }) => {
  const response = await axios.delete(`${API_URL}${id}`, {
    headers: authHeader(),
  });
  return response.data;
};

const todoService = {
  getTodos,
  addTodo,
  toggleComplete,
  deleteTodo,
};

export default todoService;
