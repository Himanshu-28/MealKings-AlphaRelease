
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setActivePage } from '../redux/menuSlice';
import { Link } from 'react-router-dom';
import { 
  FaBars, 
  FaUser, 
  FaListAlt, 
  FaHistory, 
  FaClipboardList 
} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const RestaurantProfile = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handlePageChange = (page) => {
    dispatch(setActivePage(page));
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="restaurant-profile dropdown position-relative">
      <button 
        onClick={toggleDropdown} 
        className="btn btn-primary dropdown-toggle rounded-pill fw-bold shadow-sm d-flex align-items-center"
      >
        <FaBars className="me-2 fs-5" /> 
        Menu
      </button>
      {isOpen && (
        <div className="dropdown-menu show border-0 rounded-3 shadow-sm">
          <div className="dropdown-header bg-primary text-white rounded-top">
            Restaurant Profile
          </div>
          <Link 
            to="/restaurant-account" 
            className="dropdown-item"
            onClick={() => handlePageChange('RestaurantAccount')}
          >
            <FaUser className="me-2" />
            My Restaurant Account
          </Link>
          <Link 
            to="/live-order-status" 
            className="dropdown-item"
            onClick={() => handlePageChange('LiveOrderStatus')}
          >
            <FaClipboardList className="me-2" />
            Live Order Status
          </Link>
          <Link 
            to="/orders-history" 
            className="dropdown-item"
            onClick={() => handlePageChange('OrdersHistory')}
          >
            <FaHistory className="me-2" />
            Orders History
          </Link>
          <Link 
            to="/restaurant-menu" 
            className="dropdown-item"
            onClick={() => handlePageChange('RestaurantMenu')}
          >
            <FaListAlt className="me-2" />
            Menu of Restaurant
          </Link>
          <div className="dropdown-divider"></div>
          <Link 
            to="/logout" 
            className="dropdown-item text-danger"
            onClick={() => handlePageChange('Logout')}
          >
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default RestaurantProfile;
