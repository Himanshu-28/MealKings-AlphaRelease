import Footer from "./Footer";
import LandingPage from "./LandingPage";
import Navbarbefore from "./Navbarbefore";
function Home() {
  const containerStyle = {
    backgroundImage: `url(https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png)`, // Replace with your image path
    // backgroundSize: 'cover', // Make sure the image covers the entire container
    backgroundPosition: 'center', // Center the image
    backgroundRepeat: 'no-repeat', // Avoid repeating the image
    height: '100vh', // Make sure the container takes up the full viewport height
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white', // Text color for readability on the background
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' ,// Add shadow to text for better readability
    backgroundSize: '100%'
  };
    return (
        <>
       
        <Navbarbefore/>
        <div style={containerStyle}  className="home-container">
      <div className="container mt-4">
     
       
        <h2>MealKings</h2>
        <p>Serves You better than your wife</p>

      </div>

      <LandingPage/>
 </div>

       
    </>
    );
  }
  
  export default Home;
  