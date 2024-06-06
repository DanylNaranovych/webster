import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import Header from './Header';
import styles from '../../styles/Contact.module.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
    };

    return (
        <div>
            <Header />
            <Container className={styles.contactContainer}>
                <Card className={styles.contactCard}>
                    <Card.Body>
                        <Card.Title
                            className={`text-center ${styles.cardTitle}`}
                        >
                            Contact Us
                        </Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formName" className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={styles.formControl}
                                />
                            </Form.Group>

                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={styles.formControl}
                                />
                            </Form.Group>

                            <Form.Group
                                controlId="formMessage"
                                className="mb-3"
                            >
                                <Form.Label>Message</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    placeholder="Enter your message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={styles.formControl}
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                type="submit"
                                className={styles.submitButton}
                                block
                            >
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Contact;
