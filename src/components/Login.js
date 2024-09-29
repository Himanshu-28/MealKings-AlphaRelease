import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    // Retrieve registered user data from localStorage
    const registeredUser = {email:'kunalsarwan30@gmail.com',password:'kunal'};

    if (!registeredUser) {
      setError('No registered user found.');
      return;
    }

    // Validate user credentials
    if (registeredUser.email === email && registeredUser.password === password) {
      setSuccessMessage('Login successful!');
      alert('Login successful!');
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className='login-page'>
      <div className="login-container">
        <div className="login-card card shadow-lg p-4">
          <h3 className="text-center">Login</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}

          <form onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="on"
              />
            </div>

            <div className="mb-3 submit-button">
              <button type="submit" className="btn btn-primary" data-toggle="button" aria-pressed="false" autoComplete="off">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
