import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuItems from './components/MenuItems';
import Cart from './components/Cart';
import Header from './components/Header';

const App = () => (
  <Router>
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="flex-fill">
        <Routes>
          <Route path="/" element={<MenuItems />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
      <footer className="footer mt-auto py-3">
        <div className="container">
          <span>© 2024 MEAL KINGS</span>
        </div>
      </footer>
    </div>
  </Router>
);

export default App;
