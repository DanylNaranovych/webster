import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import Header from './Header/Header';
import styles from '../styles/Profile.module.css';

const Profile = () => {
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://via.placeholder.com/150',
    };

    return (
        <div>
            <Header />
            <Container className={styles.profileContainer}>
                <Card className={styles.profileCard}>
                    <Card.Img
                        variant="top"
                        src={user.avatar}
                        className={styles.avatar}
                    />
                    <Card.Body>
                        <Card.Title className={styles.cardTitle}>
                            {user.name}
                        </Card.Title>
                        <Card.Text className={styles.cardText}>
                            {user.email}
                        </Card.Text>
                        <div className={styles.buttonGroup}>
                            <Button
                                variant="primary"
                                className={styles.editButton}
                            >
                                Edit Profile
                            </Button>
                            <Button
                                variant="outline-danger"
                                className={styles.logoutButton}
                            >
                                Logout
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Profile;
