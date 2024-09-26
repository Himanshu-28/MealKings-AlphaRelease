import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import addMenuItemReducer from '../redux/addMenuItemSlice'; 
import menuReducer from './menuSlice'; 



const store = configureStore({
    reducer: {
        cart: cartReducer,
        menu: menuReducer, 
        addMenuItem: addMenuItemReducer, 


    },
});

export default store;

