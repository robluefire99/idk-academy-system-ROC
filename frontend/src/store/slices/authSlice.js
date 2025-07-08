import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/api';
import { registerUser } from '../../service/auth';

export const login = createAsyncThunk('auth/login', async creds => {
  const res = await API.post('/auth/login', creds);
  return res.data;
});

// Initialize token and role from localStorage if available
const initialState = {
  token: localStorage.getItem('token') || null,
  role: null,
  registerStatus: 'idle',
  registerError: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.token = null;
      state.role = null;
      localStorage.clear();
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.role  = payload.role;
        localStorage.setItem('token', payload.token);
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
