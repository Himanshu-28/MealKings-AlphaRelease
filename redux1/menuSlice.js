// src/redux/menuSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  menuItems: [],
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenuItems: (state, action) => {
      state.menuItems = action.payload; // Set menu items from API response
    },
  },
});

export const { setMenuItems } = menuSlice.actions;

export default menuSlice.reducer;
