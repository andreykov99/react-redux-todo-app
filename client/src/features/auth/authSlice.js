import { createSlice, createAsyncThunk } from 'react-redux';
import authService from './authService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  status: 'idle',
  message: '',
};

export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
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

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: {
    [register.pending]: (state, action) => {
      state.status = 'pending';
    },
    [register.fulfiled]: (state, action) => {
      state.status = 'resolved';
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.status = 'error';
      state.message = action.payload;
      state.user = null;
    },
    [login.pending]: (state, action) => {
      state.status = 'pending';
    },
    [login.fulfiled]: (state, action) => {
      state.status = 'resolved';
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.status = 'error';
      state.message = action.payload;
      state.user = null;
    },
    [logout.fulfiled]: (state, action) => {
      state.user = null;
    },
  },
});

export default authSlice.reducer;
