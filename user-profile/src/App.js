// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileDropdown from './components/ProfileDropdown';
import MyAccount from './pages/MyAccount';
import MyOrders from './pages/MyOrders';

import Logout from './pages/Logout';

function App() {
  return (
    <Router>
      <div className="App">
        <ProfileDropdown />
        <Routes>
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/my-orders" element={<MyOrders />} />
        
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
