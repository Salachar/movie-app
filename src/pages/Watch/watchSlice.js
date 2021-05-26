import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {
  fetchMovies,
} from './watchAPI';

const initialState = {
  list: [],
  byID: {},
  status: 'idle',
};

// THUNKS
export const getMovies = createAsyncThunk('watch/getMovies', async () => {
    const response = await fetchMovies();
    return response;
});

// SLICE
export const watchSlice = createSlice({
  name: 'watch',
  initialState,
  reducers: {},
  extraReducers: {
    [getMovies.pending]: (state) => {
        state.status = 'loading';
    },
    [getMovies.fulfilled]: (state, action) => {
        const movies = action.payload.data || [];
        const byID = {};
        movies.forEach((movie) => {
            byID[movie.imdb_id] = movie;
        });

        state.status = 'idle';
        state.list = movies;
        state.byID = byID;
    },
  },
});

// SELECTORS
export const selectMovies = (state) => state.watch.list;

export const selectMoviesByID = (state) => state.watch.byID;

export default watchSlice.reducer;
