import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {
  fetchSuggestions,
} from './searchAPI';

const initialState = {
  suggestions: [],
  status: 'idle',
};

// THUNKS
export const getSuggestions = createAsyncThunk('search/fetchSuggestions', async (search_text) => {
    const response = await fetchSuggestions(search_text);
    return response;
});

// SLICE
export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: {
    [getSuggestions.pending]: (state) => {
      state.status = 'loading';
    },
    [getSuggestions.fulfilled]: (state, action) => {
      state.status = 'idle';
      state.suggestions = action.payload || [];
    },
  },
});

// SELECTORS
export const selectSuggestions = (state) => state.search.suggestions;

export default searchSlice.reducer;
