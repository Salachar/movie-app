import { configureStore } from '@reduxjs/toolkit';

import searchReducer from '../pages/Search/searchSlice';
import watchReducer from '../pages/Watch/watchSlice';
import watchedReducer from '../pages/Watched/watchedSlice';
import movieReducer from '../components/Movie/movieSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    watch: watchReducer,
    watched: watchedReducer,
    movie: movieReducer,
  },
});
