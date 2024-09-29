import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import Header from './pages/Header';
import RestaurantDetailsPage from './pages/RestaurantDetailsPage';
import OrderPlacePage from "./components/OrderPlacePage";
import PaymentPage from "./components/PaymentPage";
import OrderConfirmationPage from "./components/OrderConfirmationPage";
import MenuItems from './components/MenuItems';
import Cart from './components/Cart';
import Footer from './pages/Footer';
import Restaurant from './components/Restaurant';
import RestaurantItem from './components/RestaurantItem';
import Checkout from './components/Checkout';



function App() {
  return (<>
    <Router>
      {/* <Navbar /> */}
      {/* <Header/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/restaurants/:restaurantId" element={<Restaurant/>} />
        <Route path="/order-place" element={<OrderPlacePage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
      <Route path="/menu" element={<RestaurantItem/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          
      </Routes>
    </Router>
    <Footer/>
    </>
  );
}

export default App;
