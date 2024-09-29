import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styling/Menu.css';
const RestaurantItem = () => {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState('');
  const [userId] = useState(1); // Hardcoding userId for simplicity, you can fetch from user context
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch menu details for restaurant with ID 2
    const fetchMenuDetails = async () => {
      try {
        const menuResponse = await axios.get('http://localhost:8888/restaurant/2/items');
        setMenu(menuResponse.data);
      } catch (err) {
        setError('Failed to load restaurant menu.');
      }
    };

    fetchMenuDetails();
  }, []);

  // Add item to cart (calls backend)
  const handleAddToCart = async (item) => {
    try {
      const cartItem = {
            itemId: 1,
            quantity: 1, // Defaulting to quantity 1, you can customize it later
          };

      // Send the item to the backend API to save in the cart
      const response = await axios.post('http://localhost:8888/cart/1/items', cartItem);

      if (response.status === 200) {
        // Update cart state
        setCart([...cart, item]);
      } else {
        setError('Failed to add item to the cart.');
      }
    } catch (err) {
      setError('Error adding item to the cart.');
    }
  };

  // Remove item from cart
  const handleRemoveFromCart = async (itemId) => {
    try {
      // Call your backend API to remove the item from the cart (this can be done with a DELETE API)
      await axios.delete(`http://localhost:8888/cart/1/items/1`);

      // Update cart state locally after successful removal
      setCart(cart.filter(item => item.id !== itemId));
    } catch (err) {
      setError('Error removing item from the cart.');
    }
  };
  const handleCheckout = async () => {
    navigate('/checkout')
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="restaurant-page">
      <Card className="mb-4 shadow-sm">
        <h2>Menu</h2>
        <ul className="menu-list">
          {menu.length > 0 ? (
            menu.map((item) => (
              <li key={item.id} className="menu-item">
                <p><strong>{item.itemName}</strong></p>
                <p>{item.description}</p>
                <p>Price: ${item.itemCost}</p>
                <Button variant="primary" onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </Button>
              </li>
            ))
          ) : (
            <p>No menu items available.</p>
          )}
        </ul>
      </Card>

      <Card className="mt-4 shadow-sm">
        <h2>Your Cart</h2>
        <div className='box'>
        {cart.length > 0 ? (
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <p><strong>{item.itemName}</strong></p>
                <p>Price: ${item.itemCost}</p>
                <Button variant="danger" onClick={() => handleRemoveFromCart(item.id)}>
                  Remove
                </Button>
              </li>

            ))}
           
          </ul>
         
        ) : (
          <p>Your cart is empty.</p>


        )}</div>
      </Card>

      <Button variant="danger" onClick={() => handleCheckout()}>Go To Checkout</Button>
    </div>
  );
};

export default RestaurantItem;
