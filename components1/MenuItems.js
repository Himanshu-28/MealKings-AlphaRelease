import React, { useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/cartSlice';
import { setMenuItems } from '../redux/menuSlice'; // Import the action
import axios from 'axios';
import '../custom.css';

const MenuItems = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const menuItems = useSelector((state) => state.menu.menuItems); // Access menu items from Redux store

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get('/api/menu'); // Example endpoint

                const filteredItems = response.data.map(item => ({
                    itemId: item.itemId, // Keep itemId for cart functionality
                    name: item.name,
                    price: item.price,
                }));

                dispatch(setMenuItems(filteredItems)); // Dispatch to set filtered menu items in Redux
            } catch (error) {
                console.error("Error fetching menu items:", error);
            }
        };
        fetchMenu();
    }, [dispatch]);

    return (
        <div className="container mt-4">
            <h1>Menu Items</h1>
            <div className="row">
                {menuItems.map(item => (
                    <div className="col-md-4 mb-3" key={item.id}>
                        <div className="card">
                            <div className="card-header">
                                <h5>{item.name}</h5>
                            </div>
                            <div className="card-body">
                                <p>Rs. {item.price}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <button className="btn btn-custom" onClick={() => dispatch(addToCart(item))}>Add to Cart</button>
                                    {cart[item.id] && (
                                        <div className="d-flex align-items-center">
                                            <button className="btn btn-secondary" onClick={() => dispatch(removeFromCart(item))}>-</button>
                                            <span className="mx-2">{cart[item.id].quantity}</span>
                                            <button className="btn btn-secondary" onClick={() => dispatch(addToCart(item))}>+</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-3">
                <Link to="/cart">
                    <button className="btn btn-secondary">Go to Cart</button>
                </Link>
            </div>
        </div>
    );
};

export default MenuItems;
