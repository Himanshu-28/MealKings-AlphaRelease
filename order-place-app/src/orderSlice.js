// src/orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    totalPrice: 0,
    finalPrice: 0,
    discount: 0,
    isOrderConfirmed: false,
  },
  reducers: {
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    applyDiscount: (state, action) => {
      state.discount = action.payload;
      state.finalPrice = state.totalPrice - state.discount;
    },
    confirmOrder: (state) => {
      state.isOrderConfirmed = true;
    },
    resetOrder: (state) => {
      state.isOrderConfirmed = false;
    },
  },
});

export const { setTotalPrice, applyDiscount, confirmOrder, resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
