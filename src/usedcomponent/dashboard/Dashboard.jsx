// src/components/Dashboard.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Container, Row, Col, Button, Navbar, Nav, Form, FormControl, Carousel } from 'react-bootstrap';


const Dashboard = () => {
    // const [message, setMessage] = useState('');

    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Failed to fetch user data', error);
                localStorage.removeItem('authToken');
                navigate('/login');
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('authToken');
            console.log(token); // For debugging purposes
    
            if (token) {
                await axios.get('http://localhost:5000/api/logout', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                localStorage.removeItem('authToken');
                navigate('/login');
            }
        } catch (error) {
            console.error('Logout failed', error);
        }
    };
    

    return (
        // <div>

        //   <h1>Dashboard</h1>
        //   <p>{message}</p>
        // </div>
        <>
            {/* Navigation Bar */}
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Container>
                    <Navbar.Brand href="#home">BrandName</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                            <Nav.Link href="#contact">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Hero Section */}
            <header className="hero bg-primary text-white text-center py-5">
                <Container>
                    <h1>Welcome to Our Service</h1>
                    <p>Your one-stop solution for all your needs.</p>
                    <Button variant="light" size="lg" onClick={handleLogout}>Logout</Button>
                </Container>
            </header>

            {/* Features Section */}
            <section id="features" className="py-5">
                <Container>
                    <h2 className="text-center mb-4">Features</h2>
                    <Row>
                        <Col md={4} className="text-center mb-4">
                            <div className="feature-icon mb-3">
                                <i className="bi bi-rocket"></i>
                            </div>
                            <h4>Feature One</h4>
                            <p>Description of feature one.</p>
                        </Col>
                        <Col md={4} className="text-center mb-4">
                            <div className="feature-icon mb-3">
                                <i className="bi bi-star"></i>
                            </div>
                            <h4>Feature Two</h4>
                            <p>Description of feature two.</p>
                        </Col>
                        <Col md={4} className="text-center mb-4">
                            <div className="feature-icon mb-3">
                                <i className="bi bi-cpu"></i>
                            </div>
                            <h4>Feature Three</h4>
                            <p>Description of feature three.</p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Carousel Section */}
            <section id="carousel" className="py-5 bg-light">
                <Container>
                    <h2 className="text-center mb-4">What Our Users Say</h2>
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://via.placeholder.com/800x400"
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>First Slide Label</h3>
                                <p>First Slide Description</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://via.placeholder.com/800x400"
                                alt="Second slide"
                            />
                            <Carousel.Caption>
                                <h3>Second Slide Label</h3>
                                <p>Second Slide Description</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Container>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-5">
                <Container>
                    <h2 className="text-center mb-4">Contact Us</h2>
                    <Row>
                        <Col md={6}>
                            <Form>
                                <Form.Group controlId="formBasicName">
                                    <Form.Label>Name</Form.Label>
                                    <FormControl type="text" placeholder="Enter your name" />
                                </Form.Group>

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <FormControl type="email" placeholder="Enter your email" />
                                </Form.Group>

                                <Form.Group controlId="formBasicMessage">
                                    <Form.Label>Message</Form.Label>
                                    <FormControl as="textarea" rows={3} placeholder="Your message" />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Send
                                </Button>
                            </Form>
                        </Col>
                        <Col md={6}>
                            <h5>Contact Details</h5>
                            <p>123 Street Name, City, Country</p>
                            <p>Email: contact@yourdomain.com</p>
                            <p>Phone: (123) 456-7890</p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-3">
                <Container>
                    <p>&copy; 2024 Your Company. All rights reserved.</p>
                </Container>
            </footer>
        </>
    );
};

export default Dashboard;
