import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      if (state.cart[item.id]) {
        state.cart[item.id].quantity += 1;
      } else {
        state.cart[item.id] = { ...item, quantity: 1 };
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      const item = action.payload;
      if (state.cart[item.id]) {
        state.cart[item.id].quantity -= 1;
        if (state.cart[item.id].quantity === 0) {
          delete state.cart[item.id];
        }
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    setCartFromAPI: (state, action) => {
      state.cart = action.payload; // Set cart from API response
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
});

export const { addToCart, removeItem, setCartFromAPI } = cartSlice.actions;

export default cartSlice.reducer;
