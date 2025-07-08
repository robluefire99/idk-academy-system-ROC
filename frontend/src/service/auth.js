import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData) => {
    const response = await axios.post('/api/auth/register', userData);
    return response.data;
  }
);
