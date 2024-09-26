// features/restaurantSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching a single restaurant by ID
export const fetchRestaurantById = createAsyncThunk(
  'restaurants/fetchRestaurantById',
  async (id) => {
    const response = await axios.get(`/api/restaurants/${id}`); // Update with your endpoint
    return response.data;
  }
);

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState: {
    loading: false,
    restaurantList: [], // Store individual restaurant objects here
    errorMessage: '',
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRestaurantById.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurantList.push(action.payload); // Add the fetched restaurant to the list
        state.errorMessage = '';
      })
      .addCase(fetchRestaurantById.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'Failed to fetch restaurant';
      });
  },
});

// Selectors
export const selectRestaurantList = (state) => state.restaurants.restaurantList;
export const selectLoading = (state) => state.restaurants.loading;
export const selectErrorMessage = (state) => state.restaurants.errorMessage;

export default restaurantSlice.reducer;
