import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const api = 'http://localhost:7000/todos';

export const getTodosAsync = createAsyncThunk(
  'todos/getTodosAsync',
  async () => {
    const responce = await fetch(api);
    if (responce.ok) {
      const todos = await responce.json();
      return { todos };
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  'todos/addTodoAsync',
  async (payload) => {
    const responce = await fetch(api, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: payload.title,
      }),
    });
    if (responce.ok) {
      const todo = await responce.json();
      return { todo };
    }
  }
);

export const toggleCompleteAsync = createAsyncThunk(
  'todos/toggleCompleteAsync',
  async (payload) => {
    const responce = await fetch(`${api}/${payload.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        completed: payload.completed,
      }),
    });
    if (responce.ok) {
      const todo = await responce.json();
      return { id: todo.id, completed: todo.completed };
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodoAsync',
  async (payload) => {
    const responce = await fetch(`${api}/${payload.id}`, {
      method: 'DELETE',
    });
    if (responce.ok) {
      const todos = await responce.json();
      return { todos };
    }
  }
);

export const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };
      state.push(newTodo);
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
  extraReducers: {
    [getTodosAsync.fulfilled]: (state, action) => {
      return action.payload.todos;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.push(action.payload.todo);
    },
    [toggleCompleteAsync.fulfilled]: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
      return action.payload.todos;
    },
  },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
