import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RestauantProfile from './components/RestauantProfile';
import RestaurantAccount from './pages/RestaurantAccount';
import LiveOrderStatus from './pages/LiveOrderStatus';
import OrdersHistory from './pages/OrdersHistory';
import RestaurantMenu from './pages/RestaurantMenu';
// src/index.js or src/App.js
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <Router>
      <div>
        <RestauantProfile />
        <Routes>
          <Route path="/restaurant-account" element={<RestaurantAccount />} />
          <Route path="/live-order-status" element={<LiveOrderStatus />} />
          <Route path="/orders-history" element={<OrdersHistory />} />
          <Route path="/restaurant-menu" element={<RestaurantMenu />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
