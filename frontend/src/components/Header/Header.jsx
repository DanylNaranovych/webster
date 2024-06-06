import React, { useState } from 'react';
import {
    Navbar,
    Nav,
    Container,
    Button,
    Modal,
    Form,
    Dropdown,
} from 'react-bootstrap';

import styles from '../../styles/Header.module.css';

const Header = () => {
    const [show, setShow] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user] = useState({
        name: 'John Doe',
        avatar: 'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png',
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const toggleForm = () => setIsLogin(!isLogin);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoggedIn(true);
        handleClose();
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <>
            <Navbar
                bg="light"
                expand="lg"
                className={styles.customNavbar}
                sticky="top"
            >
                <Container>
                    <Navbar.Brand href="/" className={styles.brand}>
                        Webster
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/" className={styles.navLink}>
                                Home
                            </Nav.Link>
                            <Nav.Link href="/about" className={styles.navLink}>
                                About
                            </Nav.Link>
                            <Nav.Link
                                href="/contact"
                                className={styles.navLink}
                            >
                                Contact
                            </Nav.Link>
                        </Nav>
                        {isLoggedIn ? (
                            <Dropdown
                                align="end"
                                className={styles.userDropdown}
                            >
                                <Dropdown.Toggle className={styles.userButton}>
                                    <img
                                        src={user.avatar}
                                        alt="User Avatar"
                                        className={styles.userAvatar}
                                    />
                                    {user.name}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        href="/profile"
                                        className={styles.userButton}
                                    >
                                        Profile
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        href="/library"
                                        className={styles.userButton}
                                    >
                                        My Library
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                        onClick={handleLogout}
                                        className={styles.userButton}
                                    >
                                        Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <Button
                                variant="outline-primary"
                                className={styles.loginButton}
                                onClick={handleShow}
                            >
                                Log In
                            </Button>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton className={styles.modalHeader}>
                    <Modal.Title>{isLogin ? 'Log In' : 'Register'}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    <Form onSubmit={handleLogin}>
                        {isLogin ? (
                            <>
                                <Form.Group
                                    controlId="formBasicEmail"
                                    className={styles.formGroup}
                                >
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        className={styles.formControl}
                                    />
                                </Form.Group>
                                <Form.Group
                                    controlId="formBasicPassword"
                                    className={styles.formGroup}
                                >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        className={styles.formControl}
                                    />
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className={styles.submitButton}
                                >
                                    Log In
                                </Button>
                            </>
                        ) : (
                            <>
                                <Form.Group
                                    controlId="formBasicEmail"
                                    className={styles.formGroup}
                                >
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        className={styles.formControl}
                                    />
                                </Form.Group>
                                <Form.Group
                                    controlId="formBasicPassword"
                                    className={styles.formGroup}
                                >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        className={styles.formControl}
                                    />
                                </Form.Group>
                                <Form.Group
                                    controlId="formBasicConfirmPassword"
                                    className={styles.formGroup}
                                >
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm Password"
                                        className={styles.formControl}
                                    />
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className={styles.submitButton}
                                >
                                    Register
                                </Button>
                            </>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer className={styles.modalFooter}>
                    <Button
                        variant="secondary"
                        onClick={toggleForm}
                        className={styles.toggleButton}
                    >
                        {isLogin ? 'Switch to Register' : 'Switch to Log In'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Header;
