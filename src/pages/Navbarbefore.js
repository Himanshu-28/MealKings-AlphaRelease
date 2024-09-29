import React from 'react';
import { NavLink } from 'react-router-dom';
import HomePageDropdown from '../components/HomePageDropdown';
function Navbarbefore(props) {
    return (
        <div className='Navbar'>
            <nav class="navbar navbar-dark bg-dark transparent-navbar" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
  <div class="container-fluid">
    <a class="navbar-brand">MealKings</a>
    {/* <ul class="nav nav-pills">
  
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
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link btn btn-light" 
                to="/register" 
                style={({ isActive }) => ({
                  backgroundColor: isActive ? '#0dcaf0' : 'white',
                  color: isActive ? '#000' : '#000'
                })}>
                Register
              </NavLink>
            </li>
</ul> */}
 <HomePageDropdown/>
 </div>
</nav> 
</div>       
    );
}

export default Navbarbefore;