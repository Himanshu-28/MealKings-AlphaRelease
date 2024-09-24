import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { confirmed, cartItems, finalPrice } = location.state || { confirmed: false, cartItems: [], finalPrice: 0 };

  return (
    <div className="container-fluid bg-light" style={{ backgroundColor: "container-fluid bg-light", height: "100vh" }}>
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

          {confirmed && (
            <div className="mt-4">
              <h2 className="bg-primary text-white p-2 rounded">Order Summary</h2>
              <ul className="list-group">
                {cartItems.map((item) => (
                  <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                    {item.name}
                    <span>${item.price}</span>
                  </li>
                ))}
              </ul>
              <h4 className="mt-3" style={{ color: "#007BFF" }}>Total Price: ${finalPrice}</h4>
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
