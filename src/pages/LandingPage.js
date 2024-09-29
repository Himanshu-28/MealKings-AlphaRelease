import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        {/* Login Card */}
        <Col xs={12} sm={6} lg={4} className="mb-4">
          <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} className="text-center">
            <Card.Body>
              <Card.Title className='text-white'>Holaaa!</Card.Title>
              <Card.Text className='text-white'>Login to your Delicious meals</Card.Text>
              <Button variant="primary" href="/login">Login</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Register Card */}
        <Col xs={12} sm={6} lg={4} className="mb-4">
          <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} className="text-center">
            <Card.Body>
              <Card.Title className='text-white'>New Here?</Card.Title>
              <Card.Text className='text-white'>Let us serve you the best way!</Card.Text>
              <Button variant="primary" href="/register">Register</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
