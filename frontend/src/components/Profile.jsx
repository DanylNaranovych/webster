import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Card, Button } from 'react-bootstrap';
import Header from './Header/Header';
import { logout } from '../store/actions/auth';
import styles from '../styles/Profile.module.css';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div>
            <Header />
            <Container className={styles.profileContainer}>
                <Card className={styles.profileCard}>
                    <Card.Img
                        variant="top"
                        src="https://innostudio.de/fileuploader/images/default-avatar.png"
                        className={styles.avatar}
                    />
                    <Card.Body>
                        <Card.Title className={styles.cardTitle}>
                            {user.login}
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
                                onClick={handleLogout}
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
