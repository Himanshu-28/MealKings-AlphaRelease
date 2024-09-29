import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/MealKings.png'; // Optional: Add a logo image
import Header from './Header';
import RestaurantList from '../components/RestaurantList';
import Footer from './Footer';
import Restaurant from '../components/Restaurant';


function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('registeredUser');
    //     if (!user) {
    //   alert('You must log in to view the dashboard');
    //   navigate('/login');
    // }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('registeredUser');
    navigate('/');
  };

  return (
    <>
    <Header/>
    <div className="container mt-4" >
         
      <h2>Dashboard</h2>
      <img src={logo} alt="Logo" className="mb-2" style={{ height: '50px' }} />
      <p>Welcome to your dashboard! You are logged in.</p>
     <Restaurant/>
      <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      
    </div>
    <Footer/>
    </>
  );
}

export default Dashboard;
