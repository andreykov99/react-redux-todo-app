import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import todoService from './todoService';
import EventBus from '../common/EventBus';

export const getTodosAsync = createAsyncThunk(
  'todos/getTodosAsync',
  async (thunkAPI) => {
    try {
      return await todoService.getTodos();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (error.response && error.response.status === 401) {
        EventBus.dispatch('logout');
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  'todos/addTodoAsync',
  async (todo, thunkAPI) => {
    try {
      return await todoService.addTodo(todo);
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
      return await todoService.toggleComplete(todo);
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
      return await todoService.deleteTodo(todo);
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
  reducers: {
    reset: (state) => ({ status: 'idle', entries: [] }),
  },
  extraReducers: {
    [getTodosAsync.pending]: (state, action) => {
      state.status = 'pending';
    },
    [getTodosAsync.rejected]: (state, action) => {
      state.status = 'error';
      state.message = action.error;
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.entries = action.payload;
    },
    [addTodoAsync.pending]: (state, action) => {
      state.status = 'pending';
    },
    [addTodoAsync.rejected]: (state, action) => {
      state.status = 'error';
      state.message = action.error;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.entries.push(action.payload);
      state.status = 'resolved';
    },
    [toggleCompleteAsync.pending]: (state, action) => {
      state.status = 'pending';
    },
    [toggleCompleteAsync.rejected]: (state, action) => {
      state.status = 'error';
      state.message = action.error;
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
    [deleteTodoAsync.rejected]: (state, action) => {
      state.status = 'error';
      state.message = action.error;
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.entries = state.entries.filter(
        (todo) => todo._id !== action.payload.id
      );
    },
  },
});

export const { reset } = todoSlice.actions;

export default todoSlice.reducer;
