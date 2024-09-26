import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../custom.css';

const Cart = () => {
    const cart = useSelector((state) => state.cart.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const totalCost = Object.keys(cart).reduce((total, key) => {
        const item = cart[key];
        return total + item.price * item.quantity;
    }, 0);

    const handleNavigateToMenu = () => {
        navigate('/');
    };

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                // Replace with your backend API URL if you need to fetch cart data
                const response = await axios.get('/api/cart'); // Example endpoint
                // Update your Redux state or component state with the fetched data
            } catch (error) {
                console.error("Error fetching cart data:", error);
            }
        };

        fetchCartData();
    }, []);

    return (
        <div className="container mt-4">
            <h1>Your Cart</h1>
            <div className="list-group">
                {Object.keys(cart).map((key) => (
                    <div className="list-group-item" key={key}>
                        <span>
                            {cart[key].name} - {cart[key].quantity} x Rs. {cart[key].price} = Rs. {(cart[key].quantity * cart[key].price).toFixed(2)}
                        </span>
                        <button className="btn btn-secondary" onClick={() => dispatch(removeFromCart(cart[key]))}>Remove</button>
                    </div>
                ))}
            </div>
            <h2 className="mt-3">Total Cost: Rs. {totalCost.toFixed(2)}</h2>
            <div className="d-flex justify-content-between mt-3">
                <button className="btn btn-secondary" onClick={handleNavigateToMenu}>Add More Items</button>
            </div>
        </div>
    );
};

export default Cart;
