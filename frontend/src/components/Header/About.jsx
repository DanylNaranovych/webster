import React from 'react';
import { Container, Card } from 'react-bootstrap';
import Header from './Header';
import styles from '../../styles/About.module.css';

const About = () => {
    return (
        <div>
            <Header />
            <Container className="d-flex justify-content-center">
                <Card className={styles.aboutContainer}>
                    <Card.Body>
                        <Card.Title as="h1">About Us</Card.Title>
                        <Card.Text>
                            Welcome to Webster! We are a dedicated team of
                            professionals passionate about delivering
                            high-quality web solutions. Our mission is to create
                            user-friendly, innovative, and efficient web
                            applications that cater to the needs of our clients.
                        </Card.Text>
                        <Card.Text>
                            At Webster, we value integrity, creativity, and
                            excellence. Our team is committed to continuous
                            learning and improvement to ensure that we stay at
                            the forefront of the ever-evolving tech industry.
                        </Card.Text>
                        <Card.Text>
                            Thank you for choosing Webster. We look forward to
                            collaborating with you and helping you achieve your
                            digital goals.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default About;
