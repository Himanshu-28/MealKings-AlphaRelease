import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

import '../styling/Checkout.css'; // Import custom CSS

const Checkout = () => {
  const [menu, setMenu] = useState([]);

  const [cart, setCart] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [error, setError] = useState('');

  // useEffect(() => {
    
  //   // Fetch cart items for user with ID 1 (replace with dynamic userId if needed)
  //   const fetchCartItems = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8888/cart/1/items');
  //       setCart(response.data);
  //       calculateTotal(response.data);
  //     } catch (err) {
  //       setError('Failed to load cart items.');
  //     }
  //   };

  //   fetchCartItems();
  // }, []);
 useEffect(() => 
  
  
  {
    const fetchCartItems = async (item) => {
      try {
        const cartItem = {
              itemId: 1,
              quantity: 1, // Defaulting to quantity 1, you can customize it later
            };
  
        // Send the item to the backend API to save in the cart
        const response = await axios.get('http://localhost:8888/cart/1/items', cartItem);
        setCart([...cart, item]);
  
        if (response.status === 200) {
          // Update cart state
          setCart([...cart, item]);
        } else {
          setError('Failed to add item to the cart.');
        }
      } catch (err) {
        setError('Error adding item to the cart.');
      }
    }
    
    
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

 


  // Function to calculate total cost of the cart
  // const calculateTotal = (cartItems) => {
  //   const total = cartItems.reduce((acc, item) => acc + item.itemCost * item.quantity, 0);
  //   setTotalCost(total);
  // };

  // Checkout function
  // const handleCheckout = async () => {
  //   try {
  //     const orderData = {
  //       userId: 1, // You can change to dynamic userId
  //       cartItems: cart,
  //       totalAmount: totalCost
  //     };
  //     await axios.post('http://localhost:8888/order/add', orderData);
  //     alert('Order placed successfully!');
  //   } catch (err) {
  //     setError('Error placing the order.');
  //   }
  // };

  // if (error) {
  //   return <div className="error-message">{error}</div>;
  // }

  // return <> (
  //   <Card className="mb-4 shadow-sm">
  //   <h2>Menu</h2>
  //   <ul className="menu-list">
  //     {menu.length > 0 ? (
  //       menu.map((item) => (
  //         <li key={item.id} className="menu-item">
  //           <p><strong>{item.itemName}</strong></p>
  //           <p>{item.description}</p>
  //           <p>Price: ${item.itemCost}</p>
           
  //         </li>
  //       ))
  //     ) : (
  //       <p>No menu items available.</p>
  //     )}
  //   </ul>
  // </Card>'
  return <> (
  <Card className="mt-4 shadow-sm">
        <h2>Your Cart</h2>
        <div className='box'>
       
          <ul className="cart-list">
       
          {cart.map((item) => (
  <li key={item.id} className="cart-item">
    <p><strong>{item.itemName}</strong></p>
    <p>Price: ${item.itemCost}</p>
    {/* <Button variant="danger" onClick={() => handleRemoveFromCart(item.id)}>
      Remove
    </Button> */}
  </li>
))}

           
          </ul>
         
       </div>
      </Card>
  

)</>}
export default Checkout;
