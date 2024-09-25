

// components/RestaurantAccount.js
import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const RestaurantAccount = () => {
  // Dummy restaurant information
  const restaurantInfo = {
    name: "Delicious Bites",
    mobile: "+123 456 7890",
    address: "123 Food Lane, Flavor Town, FT 12345",
    ratings: 4.5,
    isActive: true
  };

  return (
    <div className="container mt-4">
      <Card className="text-center">
        <Card.Header as="h5">Restaurant Profile</Card.Header>
        <Card.Body>
          <Card.Title>{restaurantInfo.name}</Card.Title>
          <Card.Text>
            <strong>Mobile No:</strong> {restaurantInfo.mobile}<br />
            <strong>Address:</strong> {restaurantInfo.address}<br />
            <strong>Ratings:</strong> {restaurantInfo.ratings} ⭐<br />
            <strong>Status:</strong> {restaurantInfo.isActive ? "Active" : "Inactive"}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item><strong>Additional Info:</strong></ListGroup.Item>
          <ListGroup.Item>We serve delicious meals from various cuisines.</ListGroup.Item>
        </ListGroup>
        <Card.Footer className="text-muted">Last updated a few minutes ago</Card.Footer>
      </Card>
    </div>
  );
};

export default RestaurantAccount;
