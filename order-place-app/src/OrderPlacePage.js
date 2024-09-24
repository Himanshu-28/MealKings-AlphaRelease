import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const OrderPlacePage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Pizza", price: 10, image: "pizza.jpg" },
    { id: 2, name: "Burger", price: 5, image: "burger.png" },
  ]);

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
  
  const [couponCode, setCouponCode] = useState("");
  const [finalPrice, setFinalPrice] = useState(totalPrice);
  const predefinedCoupon = { code: "DISCOUNT10", price_of_coupon: 2 };
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    mobile: "" // Add mobile field
  });
  const [isAddressSaved, setIsAddressSaved] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    // Fetch user data from the JSON file in the public folder
    fetch("/UserAddress.json")
      .then((response) => response.json())
      .then((data) => {
        // Assuming you want to edit the first user's details
        setUserData(data.users[0]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setIsAddressSaved(false); // Reset save state if user edits the address
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
      setIsAddressSaved(true);
      alert("Address saved successfully!");
      setErrorMessages([]); // Clear errors if address is saved
    }
  };

  const applyCoupon = () => {
    if (couponCode === predefinedCoupon.code) {
      setFinalPrice(totalPrice - predefinedCoupon.price_of_coupon);
    } else {
      alert("Invalid coupon code");
    }
  };

  const continueToPayment = () => {
    if (isAddressSaved) {
      navigate('/payment', { state: { finalPrice, cartItems } });
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
                  <img src={item.image} alt={item.name} width={50} className="mr-2" />
                  <span>{item.name}</span>
                  <span className="badge bg-primary rounded-pill">Rs.{item.price}</span>
                </li>
              ))}
            </ul>
            <h5 className="card-footer text-primary">Total Price: <strong>Rs.{totalPrice}</strong></h5>
          </div>

          {/* User Address Section */}
          <div className="card mb-4">
            <h2 className="card-header text-primary">Edit Address</h2>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleInputChange}
                    className="form-control mb-2"
                    placeholder="Enter Username"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mobile">Mobile Number</label>
                  <input
                    type="text"
                    name="mobile"
                    value={userData.mobile}
                    onChange={handleInputChange}
                    className="form-control mb-2"
                    placeholder="Enter Mobile Number"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={userData.address}
                    onChange={handleInputChange}
                    className="form-control mb-2"
                    placeholder="Enter Address"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address2">Address 2</label>
                  <input
                    type="text"
                    name="address2"
                    value={userData.address2}
                    onChange={handleInputChange}
                    className="form-control mb-2"
                    placeholder="Enter Address 2"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    name="city"
                    value={userData.city}
                    onChange={handleInputChange}
                    className="form-control mb-2"
                    placeholder="Enter City"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    name="state"
                    value={userData.state}
                    onChange={handleInputChange}
                    className="form-control mb-2"
                    placeholder="Enter State"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="zip">Zip Code</label>
                  <input
                    type="text"
                    name="zip"
                    value={userData.zip}
                    onChange={handleInputChange}
                    className="form-control mb-2"
                    placeholder="Enter Zip Code"
                  />
                </div>

                <button type="button" className="btn btn-info" onClick={saveAddress}>
                  Save Address
                </button>
              </form>

              {/* Display error messages */}
              {errorMessages.length > 0 && (
                <div className="text-danger mt-3">
                  {errorMessages.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}

              {isAddressSaved && (
                <div className="mt-3">
                  <strong>Saved Address:</strong> {userData.username}, {userData.mobile}, {userData.address} {userData.address2}, {userData.city}, {userData.state}, {userData.zip}
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
          <button
            className="btn btn-success btn-block mt-5"
            onClick={continueToPayment}
            disabled={!isAddressSaved}  // Disable if address not saved
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPlacePage;
