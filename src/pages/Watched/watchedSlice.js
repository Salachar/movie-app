import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {
  fetchMovies,
} from './watchedAPI';

const initialState = {
  list: [],
  byID: {},
  status: 'idle',
};

// THUNKS
export const getMovies = createAsyncThunk('watched/getMovies', async () => {
    const response = await fetchMovies();
    return response;
});

// SLICE
export const watchedSlice = createSlice({
  name: 'watched',
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
export const selectMovies = (state) => state.watched.list;

export const selectMoviesByID = (state) => state.watched.byID;

export default watchedSlice.reducer;
