import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMenuItem } from '../redux/addMenuItemSlice'; 

const AddMenuItem = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.addMenuItem.loading);
  const errorMessage = useSelector((state) => state.addMenuItem.errorMessage);
  
  const [menuItem, setMenuItem] = useState({
    name: menuItem.name,
    description: menuItem.description,
    price: menuItem.price,
    category: menuItem.category,
    quantity: menuItem.quantity,
    restaurantId: '1', // Replace with actual logic to get restaurant id
  });

  const handleChange = (e) => {
    setMenuItem({
      ...menuItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const restaurantId = '1'; // Replace with the actual restaurant ID
    dispatch(addMenuItem({ ...menuItem, restaurantId }));
  };

  return (
    <div>
      <h2>Add Menu Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={menuItem.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={menuItem.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={menuItem.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" name="category" value={menuItem.category} onChange={handleChange} required />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" name="quantity" value={menuItem.quantity} onChange={handleChange} required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Menu Item'}
        </button>
      </form>
      {errorMessage && <p>Error: {errorMessage}</p>}
    </div>
  );
};

export default AddMenuItem;
