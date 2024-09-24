import React from 'react';
import { createRoot } from 'react-dom/client';  // Import createRoot
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// Find the root element in your HTML
const container = document.getElementById('root');

// Create the root using createRoot
const root = createRoot(container);

// Render your application
root.render(
  <Provider store={store}>
    <Router>
      <App />  {/* All routing logic is now handled in App.js */}
    </Router>
  </Provider>
);
