import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const OrderPlacePage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discounts, setDiscounts] = useState([]);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    mobile: ""
  });
  
  const [userAddress, setUserAddress] = useState(""); // State for displaying address
  const [isAddressSaved, setIsAddressSaved] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  // Fetch order items and discounts from JSON
  useEffect(() => {
    axios.get("/OrderItems.json")
      .then((response) => {
        setCartItems(response.data.items);
        const total = response.data.items.reduce((sum, item) => sum + item.totalPrice, 0);
        setTotalPrice(total);
        setFinalPrice(total); // Initial final price same as total price
      })
      .catch((error) => console.error("Error fetching order items:", error));

    axios.get("/Discounts.json")
      .then((response) => {
        // Filter discounts based on active status and valid date range
        const now = new Date();
        const activeDiscounts = response.data.discounts.filter(discount => {
          const startDate = new Date(discount.startDate);
          const endDate = new Date(discount.endDate);
          return discount.isActive && now >= startDate && now <= endDate;
        });
        setDiscounts(activeDiscounts);
      })
      .catch((error) => console.error("Error fetching discounts:", error));

    // Fetch user address data
    axios.get("/UserAddress.json") // Adjust the path if necessary
      .then((response) => {
        const user = response.data.users[0]; // Assuming there's only one user for simplicity
        setUserData({
          username: user.username,
          address: user.address,
          address2: user.address2,
          city: user.city,
          state: user.state,
          zip: user.zip,
          mobile: "" // Mobile number can be filled in if available
        });
      })
      .catch((error) => console.error("Error fetching user address:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setIsAddressSaved(false);
  };

  const validateInputs = () => {
    const errors = [];
    if (!userData.username) errors.push("Username is required.");
    if (!userData.mobile || !/^\d{10}$/.test(userData.mobile)) errors.push("Mobile number must be a 10-digit number.");
    if (!userData.address) errors.push("Address is required.");
    if (!userData.city) errors.push("City is required.");
    if (!userData.state) errors.push("State is required.");
    if (!userData.zip || !/^\d{6}$/.test(userData.zip)) errors.push("Zip code must be a 6-digit number.");
    return errors;
  };

  const saveAddress = () => {
    const errors = validateInputs();
    if (errors.length > 0) {
      setErrorMessages(errors);
    } else {
      setUserAddress(`${userData.username}, ${userData.address}, ${userData.address2 ? userData.address2 + ', ' : ''}${userData.city}, ${userData.state} - ${userData.zip}`);
      setIsAddressSaved(true);
      alert("Address saved successfully!");
      setErrorMessages([]);
    }
  };

  const applyCoupon = () => {
    const selectedDiscount = discounts.find(d => d.discountCode === couponCode);
   
    if (selectedDiscount) {
      const discountAmount = (selectedDiscount.discountPercentage / 100) * totalPrice;
      setFinalPrice(totalPrice - discountAmount);
    } else {
      alert("Invalid or inactive coupon code");
    }
  };

  const continueToPayment = () => {
    if (isAddressSaved) {
      navigate('/payment', { state: { cartItems, finalPrice } });
    } else {
      alert("Please save your address before proceeding to payment.");
    }
  };

  return (
    <div className="container-fluid bg-light" style={{ height: "100vh" }}>
      <div className="row justify-content-center align-items-center">
        <div className="col-md-8 bg-white p-5 rounded shadow">
          <h1 className="text-center text-primary mb-4">Checkout Page</h1>

          {/* Cart Items Section */}
          <div className="card mb-4">
            <h2 className="card-header text-primary">Cart Items</h2>
            <ul className="list-group list-group-flush">
              {cartItems.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {/* Placeholder for item image, replace with actual image source if available */}
                  <span>Item ID: {item.item_id} - Quantity: {item.quantity} </span>
                  <span className="badge bg-primary rounded-pill">Rs.{item.totalPrice}</span>
                </li>
              ))}
            </ul>
            <h5 className="card-footer text-primary">Total Price: <strong>Rs.{totalPrice}</strong></h5>
          </div>

          {/* User Address Section */}
          <div className="card mb-4">
            <h2 className="card-header text-primary">Shipping Address</h2>
            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <div className="col">
                    <input
                      type="text"
                      name="username"
                      value={userData.username}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      name="mobile"
                      value={userData.mobile}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Mobile Number"
                    />
                  </div>
                </div>
                <input
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                  placeholder="Address Line 1"
                />
                <input
                  type="text"
                  name="address2"
                  value={userData.address2}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                  placeholder="Address Line 2 (Optional)"
                />
                <div className="row mb-3">
                  <div className="col">
                    <input
                      type="text"
                      name="city"
                      value={userData.city}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="City"
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      name="state"
                      value={userData.state}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="State"
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      name="zip"
                      value={userData.zip}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Zip Code"
                    />
                  </div>
                </div>
                {errorMessages.length > 0 && (
                  <div className="alert alert-danger">
                    {errorMessages.map((msg, index) => (
                      <p key={index}>{msg}</p>
                    ))}
                  </div>
                )}
                <button type="button" className="btn btn-primary" onClick={saveAddress}>
                  Save Address
                </button>
              </form>
              {/* Display the saved address in a single line */}
              {isAddressSaved && (
                <div className="mt-3">
                  <h5>Saved Address:</h5>
                  <p>{userAddress}</p>
                </div>
              )}
            </div>
          </div>

          {/* Apply Coupon Section */}
          <div className="card mb-4">
            <h2 className="card-header text-primary">Apply Discount</h2>
            <div className="card-body">
              <input
                type="text"
                placeholder="Enter Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="form-control mb-2"
              />
              <button className="btn btn-primary" onClick={applyCoupon}>Apply Coupon</button>
              <h5 className="mt-3">Final Price: <strong className="text-primary">Rs.{finalPrice}</strong></h5>
            </div>
          </div>

          {/* Continue to Payment Button */}
          <button className="btn btn-success" onClick={continueToPayment}>
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPlacePage;
