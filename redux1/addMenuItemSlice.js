import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for adding a menu item
export const addMenuItem = createAsyncThunk(
  'addMenuItem/addMenuItem',
  async (menuItem) => {
    const response = await axios.post('/api/menu', menuItem); // Replace with your API endpoint
    return response.data;
  }
);

const addMenuItemSlice = createSlice({
  name: 'addMenuItem',
  initialState: {
    loading: false,
    errorMessage: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addMenuItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMenuItem.fulfilled, (state) => {
        state.loading = false;
        state.errorMessage = ''; // Clear any previous errors
      })
      .addCase(addMenuItem.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'Failed to add menu item';
      });
  },
});

// Selectors can be added as needed
export default addMenuItemSlice.reducer;
