import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { confirmed, cart, finalCost } = location.state || { confirmed: false, cart: [], finalCost: 0 };

  // Dummy ATM Card Details 
  const validCard = { number: "1234123412341234", validThru: "12/25", cvv: "123" };
  const validUPI = "user@upi"; // Dummy UPI ID
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [paymentMethod, setPaymentMethod] = useState("card"); // Default payment method
  const [userCaptcha, setUserCaptcha] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({ cardNumber: "", validThru: "", cvv: "", upiId: "" });
  const [error, setError] = useState("");

  // Generate a random captcha
  function generateCaptcha() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  // Handle Payment Input Change
  const handlePaymentChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
    setError(""); // Clear the error message when input changes
  };

  // Validate payment details
  const validatePaymentDetails = () => {
    const { cardNumber, validThru, cvv, upiId } = paymentDetails;
    if (finalCost !== 0) {
      if (paymentMethod === "card") {
        if (cardNumber.trim() === "" || validThru.trim() === "" || cvv.trim() === "") {
          return "All fields are required!";
        }
        if (cardNumber.length !== 16 || isNaN(cardNumber)) {
          return "Invalid card number. Must be 16 digits.";
        }
        if (validThru.length !== 5 || !/^\d{2}\/\d{2}$/.test(validThru)) {
          return "Invalid expiration date. Use MM/YY format.";
        }

        // Validate expiration date
        const [month, year] = validThru.split("/").map(Number);
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Months are 0-based
        const currentYear = currentDate.getFullYear() % 100;

        if (year < currentYear || (year === currentYear && month < currentMonth) || month > 12) {
          return "Expiration date must be in the future and check month should be < 12.";
        }

        if (cvv.length !== 3 || isNaN(cvv)) {
          return "Invalid CVV. Must be 3 digits.";
        }
      } else if (paymentMethod === "upi") {
        if (upiId.trim() === "") {
          return "UPI ID is required!";
        }
        if (upiId !== validUPI) {
          return "Invalid UPI ID!";
        }
      } else if (paymentMethod === "cod") {
        if (userCaptcha.trim() !== captcha) {
          return "Captcha does not match!";
        }
      }

      return "";
    } else {
      return "Cart is Empty";
    }
  };

  const handlePayment = () => {
    const validationError = validatePaymentDetails();

    if (validationError) {
      setError(validationError); // Show validation error
      return;
    }

    navigate("/order-confirmation", { state: { confirmed: true, cart, finalCost } });
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: "container-fluid bg-light", height: "100vh" }}>
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-md-6 bg-light p-4 rounded" style={{ border: "1px solid #007BFF", borderRadius: "10px" }}>
          <h1 className="text-center" style={{ color: "#007BFF" }}>Payment Page</h1>
          <p className="text-center" style={{ color: "#007BFF" }}>Final Price: Rs.{finalCost}</p>

          <div>
            <h2 style={{ color: "#007BFF" }}>Choose Payment Method</h2>
            <select
              className="form-select"
              onChange={(e) => setPaymentMethod(e.target.value)}
              value={paymentMethod}
            >
              <option value="card">Credit/Debit/ATM Card</option>
              <option value="upi">UPI</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>

          {paymentMethod === "card" && (
            <div className="mt-3">
              <h2 style={{ color: "#007BFF" }}>Card Details</h2>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={paymentDetails.cardNumber}
                onChange={handlePaymentChange}
                className="form-control mb-2"
              />
              <input
                type="text"
                name="validThru"
                placeholder="Valid Thru (MM/YY)"
                value={paymentDetails.validThru}
                onChange={handlePaymentChange}
                className="form-control mb-2"
              />
              <input
                type="password"
                name="cvv"
                placeholder="CVV"
                value={paymentDetails.cvv}
                onChange={handlePaymentChange}
                className="form-control mb-2"
              />
            </div>
          )}

          {paymentMethod === "upi" && (
            <div className="mt-3">
              <h2 style={{ color: "#0056b3" }}>UPI Details</h2>
              <input
                type="text"
                name="upiId"
                placeholder="Enter UPI ID"
                value={paymentDetails.upiId}
                onChange={handlePaymentChange}
                className="form-control mb-2"
              />
            </div>
          )}

          {paymentMethod === "cod" && (
            <div className="mt-3">
              <h2 style={{ color: "#0056b3" }}>Captcha Verification</h2>
              <p style={{ color: "#007BFF" }}>Captcha: {captcha}</p>
              <input
                type="text"
                placeholder="Enter Captcha"
                value={userCaptcha}
                onChange={(e) => setUserCaptcha(e.target.value)}
                className="form-control mb-2"
              />
            </div>
          )}

          {/* Show error message */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Payment Button */}
          <button className="btn btn-primary" onClick={handlePayment} style={{ backgroundColor: "#007BFF", border: "none" }}>Pay</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
