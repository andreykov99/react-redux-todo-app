import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import todoService from './todoService';

export const getTodosAsync = createAsyncThunk(
  'todos/getTodosAsync',
  async (thunkAPI) => {
    try {
      return todoService.getTodos();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  'todos/addTodoAsync',
  async (todo, thunkAPI) => {
    try {
      return todoService.addTodo(todo);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const toggleCompleteAsync = createAsyncThunk(
  'todos/toggleCompleteAsync',
  async (todo, thunkAPI) => {
    try {
      return todoService.toggleComplete(todo);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodoAsync',
  async (todo, thunkAPI) => {
    try {
      return todoService.deleteTodo(todo);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
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
      state.entries = action.payload;
    },
    [addTodoAsync.pending]: (state, action) => {
      state.status = 'pending';
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.entries.push(action.payload);
      state.status = 'resolved';
    },
    [toggleCompleteAsync.pending]: (state, action) => {
      state.status = 'pending';
    },
    [toggleCompleteAsync.fulfilled]: (state, action) => {
      const index = state.entries.findIndex(
        (todo) => todo._id === action.payload._id
      );
      state.entries[index].completed = action.payload.completed;
      state.status = 'resolved';
    },
    [deleteTodoAsync.pending]: (state, action) => {
      state.status = 'pending';
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.entries = state.entries.filter(
        (todo) => todo._id !== action.payload.id
      );
    },
  },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
