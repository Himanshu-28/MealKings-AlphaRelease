import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styling/Register.css';

function Register() {
  const [formData, setFormData] = useState({
    userName: '',
    name: '',
    email: '',
    password: '',
    mobileNo: '',
    address: '',
    role: '',
  
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { userName,
        name,
        email,
        password,
        mobileNo,
        address,
        role } = formData;

    // Validate if all required fields are filled
    if (!userName || !name || !email || !password || !mobileNo || !address || !role) {
      setError('All fields are required!');
      return;
    }
        console.log(formData)
        console.log(userName)
    try {
      // Send the data to your backend API
      const request = JSON.stringify(formData);
 const response = await axios.post('http://localhost:8888/users/register',{
    userName,
    name,
    email,
    password,
    mobileNo,
    address,
    role,
 })
    //   const response = await axios.post('http://localhost:8888/users/register', {
    //     userName,
    // name,
    // email,
    // password,
    // mobileNo,
    // address,
    // role,
    //   });

      if (response.status === 200) {
        // Handle success response from the server
        setSuccessMessage('Registration successful!');
        alert('Registration successful!'); // or display success message in the UI
        navigate('/login'); // Redirect to the login page
      } else {
        // Handle failure or unexpected responses
        setError('An unexpected error occurred.');
      }
    } catch (error) {
      // Handle errors from the Axios request
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className='register-page'>
        <div className="register-container">
    <div className="register-card card shadow-lg p-4">
    <h3 className="text-center">Register</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            name="userName"
            className="form-control"
            value={formData.userName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Enter the password"
            value={formData.password}
            onChange={handleChange}
            autocomplete="on"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">mobileNo</label>
          <input
            type="text"
            className="form-control"
            name="mobileNo"
            placeholder="Enter your 10 digit mobile number"
            value={formData.mobileNo}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            placeholder="Apartment, studio, or floor"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">role</label>
          <select
            className="form-select"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Choose...</option>
            <option value="Customer">Customer</option>
            <option value="Restaurant">Restaurant</option>
          </select>
        </div>

      

        <div className="mb-3 submit-button">
          <button type="submit" className="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off" >
            Register
          </button>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
}

export default Register;
