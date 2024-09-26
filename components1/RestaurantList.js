// components/RestaurantList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantById, selectRestaurantList, selectLoading, selectErrorMessage } from '../redux/restaurantSlice';

const RestaurantList = () => {
  const dispatch = useDispatch();
  const restaurantList = useSelector(selectRestaurantList);
  const loading = useSelector(selectLoading);
  const errorMessage = useSelector(selectErrorMessage);

  useEffect(() => {
    // Example: Fetch a restaurant by ID (you can replace with dynamic IDs)
    const restaurantId = '1'; // Replace with actual ID as needed
    dispatch(fetchRestaurantById(restaurantId));
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (errorMessage) return <p>Error: {errorMessage}</p>;

  return (
    <div>
      <h2>Restaurants</h2>
      <ul>
        {restaurantList.map((restaurant) => (
          <li key={restaurant.id}>{restaurant.name}</li> // Adjust based on your restaurant object structure
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
