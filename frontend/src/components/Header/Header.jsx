import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { login, logout, registration } from '../../store/actions/auth';
import LoginModal from './LoginModal';
import Message from '../Message';
import styles from '../../styles/Header.module.css';

const Header = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const user = useSelector((state) => state.auth.user);
    const message = useSelector((state) => state.auth.message);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogin = (name, password) => {
        dispatch(login(name, password));
        handleClose();
    };

    const handleCloseMessage = () => setShowMessage(false);

    const handleRegister = (
        email,
        password,
        confirmationPassword,
        name,
        full_name,
    ) => {
        dispatch(
            registration(
                email,
                password,
                confirmationPassword,
                name,
                full_name,
            ),
        ).then(() => {
            setShowMessage(true);
            handleClose();
        });
    };

    const handleLogout = () => {
        dispatch(logout());
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
                        {user ? (
                            <Dropdown
                                align="end"
                                className={styles.userDropdown}
                            >
                                <Dropdown.Toggle className={styles.userButton}>
                                    <img
                                        src="https://innostudio.de/fileuploader/images/default-avatar.png"
                                        alt="User Avatar"
                                        className={styles.userAvatar}
                                    />
                                    {user.login}
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
                    <Message
                        message={message}
                        onClose={handleCloseMessage}
                        show={showMessage}
                    />
                </Container>
            </Navbar>

            <LoginModal
                show={show}
                handleClose={handleClose}
                handleLogin={handleLogin}
                handleRegister={handleRegister}
            />
        </>
    );
};

export default Header;
