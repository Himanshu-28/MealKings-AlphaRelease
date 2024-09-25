import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux'; 
import UserProfileDropdown from './UserProfileDropDown'; 

const Header = () => {
    const cart = useSelector((state) => state.cart); 
    const cartItemCount = Object.keys(cart).reduce((total, key) => total + cart[key].quantity, 0); 

    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand">MealKings</a>
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Restaurants</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Orders</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Contact Us</a>
                    </li>
                </ul>
                <div className="navbar-text">
                    Cart: {cartItemCount} items 
                </div>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                <UserProfileDropdown />
            </div>
        </nav>
    );
};

export default Header;
