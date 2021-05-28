import {
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';

import {
    hydrateMovie,
    postMovie,
    patchMovie,
    deleteMovie,
} from './movieAPI';

const initialState = {
  added: {},
  status: 'idle',
};

// THUNKS
export const loadMovie = createAsyncThunk('movie/loadMovie', async (movie) => {
    const response = await hydrateMovie(movie);
    return response;
});

export const addMovie = createAsyncThunk('movie/addMovie', async (movie) => {
  const response = await postMovie(movie);
  return response;
});

export const updateMovie = createAsyncThunk('movie/updateMovie', async (movie) => {
  const response = await patchMovie(movie);
  return response;
});

export const removeMovie = createAsyncThunk('movie/removeMovie', async (movie) => {
  const response = await deleteMovie(movie);
  return response;
});

// SLICE
export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: {
    [loadMovie.pending]: (state) => {
        console.log('getMovie movie loading');
    },
    [loadMovie.fulfilled]: (state, action) => {
        console.log(action.payload);
        console.log('getMovie movie fulfilled');
    },
    [addMovie.pending]: (state) => {
      console.log('add movie loading');
    },
    [addMovie.fulfilled]: (state, action) => {
      console.log(action.payload);
      console.log('add movie fulfilled');
    },
    [updateMovie.pending]: (state) => {
      console.log('watch movie loading');
    },
    [updateMovie.fulfilled]: (state, action) => {
      console.log(action.payload);
      console.log('watch movie fulfilled');
    },
    [removeMovie.pending]: (state) => {
      console.log('remove movie loading');
    },
    [removeMovie.fulfilled]: (state, action) => {
      console.log(action.payload);
      console.log('remove movie fulfilled');
    }
  },
});

export default movieSlice.reducer;
