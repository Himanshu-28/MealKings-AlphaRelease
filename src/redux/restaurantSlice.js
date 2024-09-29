// redux/restaurantSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks for API calls
export const fetchRestaurant = createAsyncThunk('restaurant/fetchRestaurant', async (restaurantId) => {
  const response = await axios.get(`/restaurant/${restaurantId}`);
  return response.data;
});

export const addRestaurant = createAsyncThunk('restaurant/addRestaurant', async (restaurantData) => {
  const response = await axios.post('/restaurant/add', restaurantData);
  return response.data;
});

export const updateRestaurant = createAsyncThunk('restaurant/updateRestaurant', async ({ restaurantId, restaurantData }) => {
  const response = await axios.put(`/restaurant/update/${restaurantId}`, restaurantData);
  return response.data;
});

export const deleteRestaurant = createAsyncThunk('restaurant/deleteRestaurant', async (restaurantId) => {
  await axios.delete(`/restaurant/delete/${restaurantId}`);
  return restaurantId;
});

// Slice definition
const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: {
    restaurant: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurant.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurant = action.payload;
      })
      .addCase(fetchRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addRestaurant.fulfilled, (state, action) => {
        state.restaurant = action.payload;
      })
      .addCase(deleteRestaurant.fulfilled, (state, action) => {
        state.restaurant = null; // Or handle appropriately
      });
  },
});

// Export the async actions
export const { } = restaurantSlice.actions;

// Export the reducer
export default restaurantSlice.reducer;
