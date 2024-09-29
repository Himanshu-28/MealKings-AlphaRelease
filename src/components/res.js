import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


// function Restaurant() {
//     const { restaurantId } = useParams(); // Get the restaurantId from the route parameter
//     const [restaurant, setRestaurant] = useState(null);
//     const navigate = useNavigate();
  
//   //   const [menu, setMenu] = useState([]);
//     const [error, setError] = useState('');
//     const handleNavigateToMenu = () => {
//       navigate('/menu');
//   }};

export default function Restaurant() {
    // const { restaurantId } = useParams(); // Get the restaurantId from the route parameter
    const [restaurant, setRestaurant] = useState(null);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  // const [error, setError] = useState<string | null>(null)
  
  //   const [menu, setMenu] = useState([]);
    const [error, setError] = useState('');
    const handleNavigateToMenu = () => {
      navigate('/menu');
  };

  useEffect(() => {
    // Fetch restaurant details
    const fetchRestaurantDetails = async () => {
      try {
        const restaurantResponse = await axios.get(`http://localhost:8888/restaurant/2`);
        setRestaurant(restaurantResponse.data);

        // // Fetch the menu for this restaurant using the restaurantId
        // const menuResponse = await axios.get(`http://localhost:8888/restaurant/2/items`);
        // setMenu(menuResponse.data);
      } catch (err) {
        setError('Failed to load restaurant data.');
      }
    };

    fetchRestaurantDetails();
  }, [2]);

  // const filteredrestaurant = restaurant.filter(restaurant =>
  //   restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   restaurant.address.toLowerCase().includes(searchTerm.toLowerCase())
  // )

  return (
    <div className="restaurant-dashboard">
      <header className="header">
        <div className="header-content">
          <h1 className="app-title">FoodieExpress</h1>
          <button className="user-profile-button" aria-label="User profile">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="search-container">
          <input
            type="search"
            className="search-input"
            placeholder="Search restaurants or cuisines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>

        {isLoading ? (
          <div className="loading-message">
            <p>Loading restaurants...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
          </div>
        ) : (
          <div className="restaurant-grid">
            {restaurant  (
              <div key={restaurant.id} className="restaurant-card">
                <h2 className="restaurant-name">{restaurant.name}</h2>
                <div className="restaurant-details">
                  <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
                  <div className="restaurant-info">
                    <p className="restaurant-cuisine">{restaurant.address}</p>
                    <p className="restaurant-rating">⭐ {restaurant.ratings}</p>
                    {/* <p className="restaurant-delivery-time">{restaurant.deliveryTime}</p> */}
                  </div>
                </div>
                <button className="order-button">Order Now</button>
              </div>
            )}
          </div>
        )}
      </main>

      <style jsx>{`
        .restaurant-dashboard {
          min-height: 100vh;
          background-color: #f5f5f5;
          font-family: Arial, sans-serif;
        }
        .header {
          background-color: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .app-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
        }
        .user-profile-button {
          background: none;
          border: none;
          cursor: pointer;
        }
        .main-content {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 1rem;
        }
        .search-container {
          position: relative;
          margin-bottom: 2rem;
        }
        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
        }
        .loading-message, .error-message {
          text-align: center;
          font-size: 1.2rem;
          margin-top: 2rem;
        }
        .error-message {
          color: #d32f2f;
        }
        .restaurant-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        .restaurant-card {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          padding: 1rem;
        }
        .restaurant-name {
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }
        .restaurant-details {
          display: flex;
          margin-bottom: 1rem;
        }
        .restaurant-image {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 4px;
          margin-right: 1rem;
        }
        .restaurant-info p {
          margin: 0.25rem 0;
        }
        .restaurant-cuisine {
          color: #666;
        }
        .restaurant-rating {
          font-weight: bold;
        }
        .restaurant-delivery-time {
          color: #666;
        }
        .order-button {
          width: 100%;
          padding: 0.5rem;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .order-button:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  )
}