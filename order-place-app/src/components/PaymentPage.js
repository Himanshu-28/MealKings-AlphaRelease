import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { finalPrice, cartItems, userAddress, totalPrice, discountCode: couponCode } = location.state || { finalPrice: 0, cartItems: [] };

  // Dummy ATM Card Details 
  const validCard = { number: "1234123412341234", validThru: "12/25", cvv: "123" };
  const validUPI = "user@upi"; // Dummy UPI ID
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [paymentMethod, setPaymentMethod] = useState("card"); // Default payment method
  const [userCaptcha, setUserCaptcha] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({ cardNumber: "", validThru: "", cvv: "", upiId: "" });
  const [error, setError] = useState("");
  const [cartData, setCartData] = useState(null);

  // Generate a random captcha
  function generateCaptcha() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  useEffect(() => {
    // Fetch the cart data when the component mounts
    axios.get('http://localhost:8084/cart/1')
      .then(response => {
        setCartData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the cart data!", error);
      });
  }, []);

  if (!cartData) {
    return <div>Loading...</div>;
  }

  // Handle Payment Input Change
  const handlePaymentChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
    setError(""); // Clear the error message when input changes
  };

  // Validate payment details
  const validatePaymentDetails = () => {
    const { cardNumber, validThru, cvv, upiId } = paymentDetails;
    if (finalPrice !== 0) {
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
          return "Expiration date must be in the future.";
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

    // Prepare the new order details object
    const newOrder = {
      "neworder": {
        "order_id": 1, // Adjust as necessary
        "totalAmount": finalPrice,
        "orderStatus": "Pending",
        "paymentMethod": paymentMethod,
        "orderDate": new Date().toString(), // Use current date/time
        "deliverAddress": userAddress,
        "discountApplied": couponCode,
        "discountAmount": totalPrice - finalPrice,
      },
      "customer_id": cartData.customer.customerId,
      "restaurant_id": cartData.restaurant.restaurantId,
      "cart_id": cartData.cart_id,
    };

    console.log(newOrder)

    // Make the POST request to add the order
    axios.post('http://localhost:8085/order/add', newOrder)
      .then(response => {
        console.log("Order placed successfully:", response.data);
        navigate("/order-confirmation", { state: { confirmed: true, cartItems, finalPrice } });
      })
      .catch(error => {
        console.error("Error placing the order:", error);
        setError("There was an error processing your payment.");
      });
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: "#f8f9fa", height: "100vh" }}>
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-md-6 bg-light p-4 rounded" style={{ border: "1px solid #007BFF", borderRadius: "10px" }}>
          <h1 className="text-center" style={{ color: "#007BFF" }}>Payment Page</h1>
          <p className="text-center" style={{ color: "#007BFF" }}>Final Price: Rs.{finalPrice}</p>

          <div>
            <p><strong>Customer ID:</strong> {cartData.customer.customerId}</p>
            <p><strong>Restaurant ID:</strong> {cartData.restaurant.restaurantId}</p>
            <h1>Payment Page</h1>
            <p>Address: {userAddress}</p>
            <p>Total Price: {totalPrice}</p>
            <p>Final Price: Rs.{finalPrice}</p>
            <p>Coupon Code: {couponCode}</p>
            {/* Render cart items and the rest of the payment UI */}
          </div>
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

          <button
            className="btn btn-primary mt-3"
            onClick={handlePayment}
            style={{ backgroundColor: "#0056b3" }}
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
