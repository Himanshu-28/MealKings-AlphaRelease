import React from 'react';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { FaUserCircle, FaPhone, FaMapMarkerAlt, FaFlag } from 'react-icons/fa';

const MyAccount = () => {
  const user = {
    name: 'John Doe',
    mobile: '9876543210',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    country: 'USA'
  };

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">My Account</h1>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm rounded border-primary">
            <Card.Header className="bg-primary text-white text-center">
              <h4>User Details</h4>
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-4">
                <img 
                  src="https://via.placeholder.com/100" 
                  alt="Profile" 
                  className="rounded-circle mb-2"
                />
                <h5>{user.name}</h5>
              </div>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <FaUserCircle className="me-2" /> <strong>Name:</strong> {user.name}
                </ListGroup.Item>
                <ListGroup.Item>
                  <FaPhone className="me-2" /> <strong>Mobile No:</strong> {user.mobile}
                </ListGroup.Item>
                <ListGroup.Item>
                  <FaMapMarkerAlt className="me-2" /> <strong>Address:</strong> {user.address}
                </ListGroup.Item>
                <ListGroup.Item>
                  <FaMapMarkerAlt className="me-2" /> <strong>City:</strong> {user.city}
                </ListGroup.Item>
                <ListGroup.Item>
                  <FaFlag className="me-2" /> <strong>State:</strong> {user.state}
                </ListGroup.Item>
                <ListGroup.Item>
                  <FaFlag className="me-2" /> <strong>Country:</strong> {user.country}
                </ListGroup.Item>
              </ListGroup>
              <div className="text-center mt-4">
                <Button variant="success">Edit Profile</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MyAccount;
