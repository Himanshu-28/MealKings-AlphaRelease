import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../redux/menuSlice';

// Configure the Redux store and add your reducers
const store = configureStore({
  reducer: {
    menu: menuReducer, // Add your reducers here
  },
});

export default store;
