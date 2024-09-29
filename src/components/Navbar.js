import { NavLink } from 'react-router-dom';
import logo from '../assets/MealKings.png';
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img 
            src={logo}
            alt="Logo" 
            
          />
          Mealkings
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink 
                className="nav-link" 
                to="/" 
                style={({ isActive }) => ({
                  color: isActive ? '#0dcaf0' : 'white',
                  fontWeight: isActive ? 'bold' : 'normal'
                })}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link btn btn-outline-light mx-2" 
                to="/login" 
                style={({ isActive }) => ({
                  backgroundColor: isActive ? '#0dcaf0' : 'transparent',
                  color: isActive ? '#000' : 'white'
                })}>
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link btn btn-light" 
                to="/register" 
                style={({ isActive }) => ({
                  backgroundColor: isActive ? '#0dcaf0' : 'white',
                  color: isActive ? '#000' : '#000'
                })}>
                Register
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
