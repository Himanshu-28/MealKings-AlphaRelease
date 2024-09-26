// src/redux/feedbackSlice.js
import { createSlice } from '@reduxjs/toolkit';

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: {
        rating: null,
        comment: '',
    },
    reducers: {
        setFeedback: (state, action) => {
            state.rating = action.payload.rating;
            state.comment = action.payload.comment;
        },
        clearFeedback: (state) => {
            state.rating = null;
            state.comment = '';
        },
    },
});

export const { setFeedback, clearFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;
