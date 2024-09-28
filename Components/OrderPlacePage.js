import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceOrderPage = () => {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const customerId = 1; // // //
    axios.get(`http://localhost:8084/cart/${customerId}`)
      .then(response => {
        setCart(response.data);
      })
      .catch(error => {
        console.error("Error fetching cart:", error);
        setError("Failed to load cart. Please try again.");
      });
  }, []);

  const handlePlaceOrder = () => {
    if (cart) {
      navigate('/payment', { 
        state: { 
          cartItems: cart.items,
          finalPrice: cart.items.reduce((sum, item) => sum + item.totalPrice, 0),
          cartId: cart.cart_id,
          customerId: cart.customer.customerId,
          restaurantId: cart.restaurant.restaurantId,
          userAddress: cart.customer.address
        } 
      });
    }
  };

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  if (!cart) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Place Your Order</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Order Details</h5>
          <p><strong>Restaurant:</strong> {cart.restaurant.name}</p>
          <p><strong>Delivery Address:</strong> {cart.customer.address}</p>
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map(item => (
                <tr key={item.id}>
                  <td>{item.item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>Rs. {item.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4 className="mt-3">Total: Rs. {cart.items.reduce((sum, item) => sum + item.totalPrice, 0)}</h4>
          <button className="btn btn-primary mt-3" onClick={handlePlaceOrder}>Proceed to Payment</button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;