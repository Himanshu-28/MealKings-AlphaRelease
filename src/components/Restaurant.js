import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // For dynamic routing to get restaurantId
import '../styling/Restaurant.css'; // Assuming you have a separate CSS file for styling

function Restaurant() {
  const { restaurantId } = useParams(); // Get the restaurantId from the route parameter
  const [restaurant, setRestaurant] = useState(null);
  const navigate = useNavigate();

//   const [menu, setMenu] = useState([]);
  const [error, setError] = useState('');
  const handleNavigateToMenu = () => {
    navigate('/menu');
};
  useEffect(() => {
    // Fetch restaurant details
    const fetchRestaurantDetails = async () => {
      try {
        const restaurantResponse = await axios.get(`http://localhost:8888/restaurant/2`);
        setRestaurant(restaurantResponse.data);

        // // Fetch the menu for this restaurant using the restaurantId
        // const menuResponse = await axios.get(`http://localhost:8888/restaurant/2/items`);
        // setMenu(menuResponse.data);
      } catch (err) {
        setError('Failed to load restaurant data.');
      }
    };

    fetchRestaurantDetails();
  }, [2]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="restaurant-page">
      {restaurant ? (
        <div className="restaurant-details">
          <h1>{restaurant.name}</h1>
          <p><strong>Address:</strong> {restaurant.address}</p>
          <p><strong>Contact Info:</strong> {restaurant.mobileNo}</p>

          <p><strong>Rating:</strong> {restaurant.ratings} / 5</p>

        <button onClick={handleNavigateToMenu}>Go To Menu</button>
          {/* <h2>Menu</h2>
          <ul className="menu-list">
            
            {menu.length > 0 ? (
              menu.map((item) => (
                <li key={item.id} className="menu-item">
                  <p><strong>{item.itemName}</strong></p>
                  <p>{item.description}</p>
                  <p>Price: ${item.itemCost}</p>
                </li>
              ))
            ) : (
              <p>No menu items available.</p>
            )}
          </ul> */}
        </div>
      ) : (
        <p>Loading restaurant details...</p>
      )}
    </div>
  );
}

export default Restaurant;
