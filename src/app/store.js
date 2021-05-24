import { configureStore } from '@reduxjs/toolkit';

import searchReducer from '../pages/Search/searchSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});
