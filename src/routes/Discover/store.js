import { configureStore } from '@reduxjs/toolkit';
import slice from './features/slice';

export const store = configureStore({
  reducer: {
    slice: slice,
  },
});
