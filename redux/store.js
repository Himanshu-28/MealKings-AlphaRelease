import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import menuReducer from './menuSlice'; // Import the new menu reducer

const store = configureStore({
    reducer: {
        cart: cartReducer,
        menu: menuReducer, // Add menu reducer here
    },
});

export default store;
