import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

export default function Component() {
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
  const [userAddress, setUserAddress] = useState("");
  const [isAddressSaved, setIsAddressSaved] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [restaurantId, setRestaurantId] = useState(null);

  useEffect(() => {
    // Fetch cart items
    axios.get("http://localhost:8084/cart/1/items")
      .then((response) => {
        setCartItems(response.data);
        const total = response.data.reduce((sum, item) => sum + item.totalPrice, 0);
        setTotalPrice(total);
        setFinalPrice(total);
        setCartId(response.data[0]?.cartId);
        setRestaurantId(response.data[0]?.restaurantId);
      })
      .catch((error) => console.error("Error fetching order items:", error));

    // Fetch user data
    axios.get("http://localhost:8083/customer/1")
      .then((response) => {
        const user = response.data;
        setUserData({
          username: user.name,
          address: user.address,
          address2: "",
          city: user.city || "",
          state: user.state || "",
          zip: "",
          mobile: user.mobileNo
        });
        setCustomerId(user.customerId);
      })
      .catch((error) => console.error("Error fetching user data:", error));

    // Fetch discounts
    axios.get("http://localhost:8086/discount/all")
      .then((response) => {
        const now = new Date();
        const activeDiscounts = response.data.filter(discount => {
          const startDate = new Date(discount.startDate);
          const endDate = new Date(discount.endDate);
          return discount.active && now >= startDate && now <= endDate;
        });
        setDiscounts(activeDiscounts);
      })
      .catch((error) => console.error("Error fetching discounts:", error));
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
      navigate('/payment', { 
        state: { 
          cartItems, 
          finalPrice, 
          userAddress, 
          totalPrice, 
          discountCode: couponCode,
          cartId,
          customerId,
          restaurantId
        } 
      });
    } else {
      alert("Please save your address before proceeding to payment.");
    }
  };

  return (
    <div className="container-fluid bg-light" style={{ minHeight: "100vh", paddingTop: "2rem" }}>
      <div className="row justify-content-center">
        <div className="col-md-8 bg-white p-5 rounded shadow">
          <h1 className="text-center text-primary mb-4">Checkout Page</h1>

          <div className="card mb-4">
            <h2 className="card-header text-primary">Cart Items</h2>
            <ul className="list-group list-group-flush">
              {cartItems.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>{item.item.itemName} - Quantity: {item.quantity}</span>
                  <span className="badge bg-primary rounded-pill">Rs.{item.totalPrice.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <h5 className="card-footer text-primary">Total Price: <strong>Rs.{totalPrice.toFixed(2)}</strong></h5>
          </div>

          <div className="card mb-4">
            <h2 className="card-header text-primary">Delivery Address</h2>
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
                      <p key={index} className="mb-0">{msg}</p>
                    ))}
                  </div>
                )}
                <button type="button" className="btn btn-primary" onClick={saveAddress}>
                  Save Address
                </button>
              </form>
              {isAddressSaved && (
                <div className="mt-3">
                  <h5>Saved Address:</h5>
                  <p>{userAddress}</p>
                </div>
              )}
            </div>
          </div>

          <div className="card mb-4">
            <h2 className="card-header text-primary">Apply Discount</h2>
            <div className="card-body">
              <input
                type="text"
                className="form-control mb-3"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter Coupon Code"
              />
              <button className="btn btn-success" onClick={applyCoupon}>Apply Coupon</button>
              <h5 className="mt-3">Available Coupons:</h5>
              <ul className="list-group">
                {discounts.map((discount) => (
                  <li key={discount.discountCode} className="list-group-item">
                    <span>{discount.discountCode}: {discount.discountPercentage}% off (Valid until {new Date(discount.endDate).toLocaleDateString()})</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card mb-4">
            <h2 className="card-header text-primary">Final Price</h2>
            <h5 className="card-body">Total After Discount: <strong>Rs.{finalPrice.toFixed(2)}</strong></h5>
            <button className="btn btn-primary btn-lg" onClick={continueToPayment}>
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
