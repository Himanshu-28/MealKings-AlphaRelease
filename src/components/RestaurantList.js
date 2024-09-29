import React from 'react';
import { useSelector } from 'react-redux';
import RestaurantItem from './RestaurantItem';
import { Container, Row, Col } from 'react-bootstrap';

const RestaurantList = () => {
  const restaurants = useSelector((state) => state.restaurants.restaurantList);

  return (
    <Container>
      <Row>
        {restaurants.map((restaurant) => (
          <Col key={restaurant.id} sm={12} md={6} lg={4}>
            <RestaurantItem restaurant={restaurant} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RestaurantList;
