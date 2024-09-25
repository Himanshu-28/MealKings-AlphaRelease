// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './profileSlice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
});
