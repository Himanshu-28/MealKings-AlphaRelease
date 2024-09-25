// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import feedbackReducer from './feedbackSlice'; // Import the feedback reducer

const store = configureStore({
    reducer: {
        cart: cartReducer,
        feedback: feedbackReducer, // Add feedback reducer here
    },
});

export default store;
