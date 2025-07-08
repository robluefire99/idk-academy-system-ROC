import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import scoreReducer from './slices/scoreSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    scores: scoreReducer
  }
});
