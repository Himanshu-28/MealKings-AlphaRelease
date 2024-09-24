import React from "react";
import { Routes, Route } from "react-router-dom";
import OrderPlacePage from "./OrderPlacePage";
import PaymentPage from "./PaymentPage";
import OrderConfirmationPage from "./OrderConfirmationPage";

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
