import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginAPI } from '../../api/api';
import { registerUser } from '../../service/auth';

export const login = createAsyncThunk('auth/login', async (creds, { rejectWithValue }) => {
  try {
    const res = await loginAPI(creds.email, creds.password);
    if (res.data.success) {
      return res.data;
    } else {
      return rejectWithValue(res.data.error?.message || 'Login failed');
    }
  } catch (err) {
    return rejectWithValue(err.response?.data?.error?.message || err.message);
  }
});

// Initialize token, user, and role from localStorage if available
const initialState = {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  role: localStorage.getItem('role') || null,
  loginStatus: 'idle',
  loginError: null,
  registerStatus: 'idle',
  registerError: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.token = null;
      state.user = null;
      state.role = null;
      localStorage.clear();
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, (state) => {
        state.loginStatus = 'loading';
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
        state.role = payload.user.role;
        state.loginStatus = 'succeeded';
        localStorage.setItem('token', payload.token);
        localStorage.setItem('user', JSON.stringify(payload.user));
        localStorage.setItem('role', payload.user.role);
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = 'failed';
        state.loginError = action.payload || action.error.message;
      })
      // Register user cases
      .addCase(registerUser.pending, (state) => {
        state.registerStatus = 'loading';
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.registerStatus = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerStatus = 'failed';
        state.registerError = action.error.message;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
