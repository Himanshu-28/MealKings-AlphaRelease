// src/redux/profileSlice.js
import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    isDropdownOpen: false,
  },
  reducers: {
    toggleDropdown: (state) => {
      state.isDropdownOpen = !state.isDropdownOpen;
    },
    closeDropdown: (state) => {
      state.isDropdownOpen = false;
    },
  },
});

export const { toggleDropdown, closeDropdown } = profileSlice.actions;

export default profileSlice.reducer;
