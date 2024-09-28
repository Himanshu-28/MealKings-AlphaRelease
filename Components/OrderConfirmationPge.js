import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const { confirmed, orderId, finalPrice } = location.state || {};

  if (!confirmed) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          No order confirmation found. Please try placing your order again.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title text-center text-success">Order Confirmed!</h1>
          <div className="text-center mb-4">
            <i className="bi bi-check-circle-fill text-success" style={{fontSize: '4rem'}}></i>
          </div>
          <p className="text-center">Thank you for your order. Your order has been successfully placed and confirmed.</p>
          <div className="mt-4">
            <p><strong>Order ID:</strong> {orderId}</p>
            <p><strong>Total Amount Paid:</strong> Rs. {finalPrice}</p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;