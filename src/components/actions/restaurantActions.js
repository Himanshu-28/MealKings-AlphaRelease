import axios from 'axios';

// Action types
export const FETCH_RESTAURANTS_REQUEST = 'FETCH_RESTAURANTS_REQUEST';
export const FETCH_RESTAURANTS_SUCCESS = 'FETCH_RESTAURANTS_SUCCESS';
export const FETCH_RESTAURANTS_FAILURE = 'FETCH_RESTAURANTS_FAILURE';

// Action creator for fetching restaurants
export const fetchRestaurants = () => async (dispatch) => {
  dispatch({ type: FETCH_RESTAURANTS_REQUEST });

  try {
    const response = await axios.get('http://localhost:8888/restaurant/all');
    dispatch({
      type: FETCH_RESTAURANTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_RESTAURANTS_FAILURE,
      payload: error.message,
    });
  }
};
