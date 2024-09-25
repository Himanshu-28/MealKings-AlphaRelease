
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDropdown, closeDropdown } from '../redux/profileSlice';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsPerson, BsBox, BsCardText, BsBoxArrowRight } from 'react-icons/bs';

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const isDropdownOpen = useSelector((state) => state.profile.isDropdownOpen);

  const handleToggle = () => {
    dispatch(toggleDropdown());
  };

  const handleClose = () => {
    dispatch(closeDropdown());
  };

  return (
    <div className="profile-dropdown dropdown position-relative">
      <button
        className="btn btn-primary dropdown-toggle rounded-pill fw-bold shadow-sm"
        type="button"
        id="profile-dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded={isDropdownOpen}
        onClick={handleToggle}
      >
        <BsPerson className="me-2" /> Profile
      </button>
      <div
        className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}
        aria-labelledby="profile-dropdown-toggle"
      >
        
        <Link to="/my-account" className="dropdown-item" onClick={handleClose}>
          <BsPerson className="me-2" /> My Account
         
        </Link>
        <Link to="/my-orders" className="dropdown-item" onClick={handleClose}>
          <BsBox className="me-2" /> My Orders
         
        </Link>
       
        <div className="dropdown-divider"></div>
        
        <Link to="/logout" className="dropdown-item text-danger" onClick={handleClose}>
          <BsBoxArrowRight className="me-2" /> Logout
        </Link>
      </div>
    </div>
  );
};

export default ProfileDropdown;
