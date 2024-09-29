import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';

const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const restaurant = useSelector((state) =>
    state.restaurants.restaurantList.find((r) => r.id === parseInt(id))
  );

  if (!restaurant) {
    return <h2 className="text-center mt-5">Restaurant not found</h2>;
  }

  return (
    <Container className="mt-5">
      <Card className="shadow-lg">
        <Card.Body>
          <Card.Title>{restaurant.name}</Card.Title>
          <Card.Text>Cuisine: {restaurant.cuisine}</Card.Text>
          <Card.Text>Rating: {restaurant.rating}</Card.Text>
          <Button variant="primary" as={Link} to="/dashboard">
            Back
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RestaurantDetailsPage;
