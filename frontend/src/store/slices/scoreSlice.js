import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/api';

export const fetchScores = createAsyncThunk('scores/fetch', async params => {
  const res = await API.get('/scores', { params: { ...params, limit: 100 } });
  return res.data;
});
export const addScore = createAsyncThunk('scores/add', async data => {
  const res = await API.post('/scores', data);
  return res.data;
});

const scoreSlice = createSlice({
  name: 'scores',
  initialState: { list: [] },
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchScores.fulfilled, (state, { payload }) => {
        state.list = payload;
      })
      .addCase(addScore.fulfilled, (state, { payload }) => {
        state.list.unshift(payload);
      })
});

export default scoreSlice.reducer;
