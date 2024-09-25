// slices/menuSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activePage: '', // To track which page is currently active
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setActivePage: (state, action) => {
      state.activePage = action.payload; // Set the active page based on user click
    },
  },
});

export const { setActivePage } = menuSlice.actions;

export default menuSlice.reducer;
