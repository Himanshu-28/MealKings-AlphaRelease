import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../custom.css';

const Cart = () => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || {});
    const navigate = useNavigate();

    const totalCost = Object.keys(cart).reduce((total, key) => {
        const item = cart[key];
        return total + item.price * item.quantity;
    }, 0);

    const handleNavigateToMenu = () => {
        navigate('/');
    };

    return (
        <div className="container mt-4">
            <h1>Your Cart</h1>
            <div className="list-group">
                {Object.keys(cart).map(key => (
                    <div className="list-group-item" key={key}>
                        <span>{cart[key].name} - {cart[key].quantity} x Rs. {cart[key].price} = Rs. {(cart[key].quantity * cart[key].price).toFixed(2)}</span>
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
