import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { confirmed, cartItems, finalPrice } = location.state || { confirmed: false, cartItems: [], finalPrice: 0 };

  return (
    <div className="container-fluid bg-light" style={{ height: "100vh" }}>
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-md-8 bg-light p-4 rounded" style={{ border: "1px solid #007BFF" }}>
          <div className="bg-primary text-white p-3 rounded">
            <h1 className="text-center">
              {confirmed ? "Order Confirmed!" : "Order Not Confirmed"}
            </h1>
            <h3 className="text-center" style={{ color: confirmed ? "#e1faff" : "red" }}>
              {confirmed ? "Thank you for your order!" : "We're sorry, please try again."}
            </h3>
          </div>

          {/* Cart Items Summary */}
          {confirmed && (
            <div className="mt-4">
              <h2 className="text-center" style={{ color: "#007BFF" }}>Cart Items Summary</h2>
              <ul className="list-group mb-3">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {/* Placeholder for item image, replace with actual image source if available */}
                  <span>Item ID: {item.item_id} - Quantity: {item.quantity} </span>
                  <span className="badge bg-primary rounded-pill">Rs.{item.totalPrice}</span>
                </li>
                   
                  ))
                ) : (
                  <p>No items in the cart.</p>
                )}
              </ul>

              <h4 className="mt-3 text-center" style={{ color: "#007BFF" }}>Total Price: Rs.{finalPrice}</h4>
            </div>
          )}

          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={() => navigate('/order-place')} style={{ backgroundColor: "#007BFF", border: "none" }}>
              Place Another Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
