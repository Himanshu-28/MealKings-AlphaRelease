import React from "react";
import { Routes, Route } from "react-router-dom";
import OrderPlacePage from "./components/OrderPlacePage";
import PaymentPage from "./components/PaymentPage";
import OrderConfirmationPage from "./components/OrderConfirmationPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<OrderPlacePage />} />
      <Route path="/order-place" element={<OrderPlacePage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
    </Routes>
  );
}

export default App;
