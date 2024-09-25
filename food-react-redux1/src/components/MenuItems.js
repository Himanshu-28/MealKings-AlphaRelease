import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/cartSlice';
import '../custom.css';

const MenuItems = () => {
    const [menuItems, setMenuItems] = useState([]); 
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);

    useEffect(() => {
        const fetchMenu = async () => {
            const response = await fetch('/menu.txt');
            const data = await response.text();
            const items = JSON.parse(data);
            setMenuItems(items);
        };
        fetchMenu();
    }, []);

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
