import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import UserProfileDropdown from './UserProfileDropDown'; 

const Header = () => {
    return (
        <nav class="navbar bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand">MealKings</a>
    <ul class="nav nav-pills">
  <li class="nav-item">
    <a class="nav-link "  href="#">Home</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Restaurants</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Orders</a>
  </li>
  <li class="nav-item">
    <a class="nav-link " href="#" >Contact Us</a>
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