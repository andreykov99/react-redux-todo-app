import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const api = 'http://localhost:7000/todos';

export const getTodosAsync = createAsyncThunk(
  'todos/getTodosAsync',
  async () => {
    const responce = await fetch(api);
    if (responce.ok) {
      const todos = await responce.json();
      console.log(`#####: todos = ${todos} `);
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
  initialState: {
    status: 'idle',
    entries: [],
  },
  reducers: {},
  extraReducers: {
    [getTodosAsync.pending]: (state, action) => {
      state.status = 'pending';
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.entries = action.payload.todos;
    },
    [addTodoAsync.pending]: (state, action) => {
      state.status = 'pending';
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.entries.push(action.payload.todo);
      state.status = 'resolved';
    },
    [toggleCompleteAsync.pending]: (state, action) => {
      state.status = 'pending';
    },
    [toggleCompleteAsync.fulfilled]: (state, action) => {
      const index = state.entries.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.entries[index].completed = action.payload.completed;
      state.status = 'resolved';
    },
    [deleteTodoAsync.pending]: (state, action) => {
      state.status = 'pending';
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.entries = action.payload.todos;
    },
  },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
