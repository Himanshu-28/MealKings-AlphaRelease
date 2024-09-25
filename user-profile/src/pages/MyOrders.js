import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const MyOrders = () => {
  const orders = [
    {
      orderId: '12345',
      date: '2024-09-25 14:30', // Adding date and time
      items: [
        { itemId: '001', name: 'Pizza', price: 300, image: 'https://via.placeholder.com/150?text=Pizza' },
        { itemId: '002', name: 'Burger', price: 150, image: 'https://via.placeholder.com/150?text=Burger' }
      ]
    }
  ];

  return (
    <Container fluid className="my-4">
      <h1 className="text-center mb-4 text-primary">My Orders</h1>
      <Row className="g-3">
        {orders[0].items.map((item, index) => (
          <Col md={6} lg={4} key={index} className="mb-3 d-flex justify-content-center">
            <Card className="shadow-sm border-0 rounded-3" style={{ width: '70%' }}>
              <Card.Img variant="top" src={item.image} alt={item.name} />
              <Card.Body>
                <Card.Title className="fw-bold">{item.name}</Card.Title>
                <Card.Text>
                  <strong>Order ID:</strong> {orders[0].orderId}
                </Card.Text>
                <Card.Text>
                  <strong>Item ID:</strong> {item.itemId}
                </Card.Text>
                <Card.Text>
                  <strong>Price:</strong> Rs.{item.price}
                </Card.Text>
                <Card.Text>
                  <strong>Date:</strong> {orders[0].date} {/* Displaying date and time */}
                </Card.Text>
                <Button variant="primary" className="w-100">Order Again</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="text-center mt-4">
        <Button variant="outline-primary" className="mx-auto">View All Orders</Button>
      </div>
    </Container>
  );
};

export default MyOrders;
