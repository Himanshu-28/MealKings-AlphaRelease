import React from 'react';
import RestaurantList from '../components/RestaurantList';
import { Container, Navbar, Nav } from 'react-bootstrap';

const HomePage = () => {
  return (
    <>
     
 <Container className="mt-4">
            <h1 className="text-center">Welcome to MealKings</h1>
            <h4 className="text-center mb-5">Delicious Meals Delivered to You</h4>
            <RestaurantList/>
           
      </Container>


      
    </>
  );
};

export default HomePage;
