import { configureStore } from '@reduxjs/toolkit';
import restaurantReducer from './restaurantSlice';
import orderReducer from './orderSlice';
import cartReducer from './cartSlice';


const store = configureStore({
  reducer: {
    restaurants: restaurantReducer,
    order: orderReducer,
    cart: cartReducer
  },
});

export default store;

