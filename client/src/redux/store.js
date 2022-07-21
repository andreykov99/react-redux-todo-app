import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todos/todoSlice';
import authReducer from '../features/auth/authSlice';

export default configureStore({
  reducer: {
    todos: todoReducer,
    auth: authReducer,
  },
});
