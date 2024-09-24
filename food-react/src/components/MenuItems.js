import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../custom.css';

const MenuItems = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || {});

    useEffect(() => {
        const fetchMenu = async () => {
            const response = await fetch('/menu.txt');
            const data = await response.text();
            const items = JSON.parse(data);
            setMenuItems(items);
        };
        fetchMenu();
    }, []);

    const handleAddToCart = (item) => {
        const newCart = { ...cart };
        if (newCart[item.id]) {
            newCart[item.id].quantity += 1;
        } else {
            newCart[item.id] = { ...item, quantity: 1 };
        }
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const handleRemoveFromCart = (item) => {
        const newCart = { ...cart };
        if (newCart[item.id]) {
            newCart[item.id].quantity -= 1;
            if (newCart[item.id].quantity === 0) {
                delete newCart[item.id];
            }
        }
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

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
                                    <button className="btn btn-custom" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                                    {cart[item.id] && (
                                        <div className="d-flex align-items-center">
                                            <button className="btn btn-secondary" onClick={() => handleRemoveFromCart(item)}>-</button>
                                            <span className="mx-2">{cart[item.id].quantity}</span>
                                            <button className="btn btn-secondary" onClick={() => handleAddToCart(item)}>+</button>
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
