// src/components/Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';

import { Navbar, Nav } from 'react-bootstrap';
import UserProfileDropdown from '../components/UserProfileDropdown';

const Header = () => {
    return (
        <nav class="navbar navbar-dark bg-dark ">
  <div class="container-fluid">
    <a class="navbar-brand">MealKings</a>
    <ul class="nav nav-pills">
  
  <li className="nav-item">
              <NavLink 
                className="nav-link" 
                to="/" 
                style={({ isActive }) => ({
                  color: isActive ? '#0dcaf0' : 'white',
                  fontWeight: isActive ? 'bold' : 'normal'
                })}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link btn btn-outline-light mx-2" 
                to="/login" 
                style={({ isActive }) => ({
                  backgroundColor: isActive ? '#0dcaf0' : 'transparent',
                  color: isActive ? '#000' : 'white'
                })}>
                About us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link btn btn-light" 
                to="/order-place" 
                style={({ isActive }) => ({
                  backgroundColor: isActive ? '#0dcaf0' : 'white',
                  color: isActive ? '#000' : '#000'
                })}>
               Order
              </NavLink>
            </li>
</ul>


    <form class="d-flex" role="search">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>

    <UserProfileDropdown/>

  </div>

</nav>
    );
};

export default Header;
