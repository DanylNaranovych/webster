import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import styles from '../styles/Header.module.css';

const Header = () => {
    return (
        <Navbar bg="light" expand="lg" className={styles.customNavbar}>
            <Container>
                <Navbar.Brand href="#home">Webster</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#about">About</Nav.Link>
                        <Nav.Link href="#contact">Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
