import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from '../../styles/Header.module.css';

const LoginModal = ({ show, handleClose, handleLogin, handleRegister }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfitmationPassword] = useState('');
    const [name, setName] = useState('');
    const [fullName, setFullName] = useState('');

    const toggleForm = () => setIsLogin(!isLogin);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleNameChange = (e) => setName(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handlePasswordConfirmationChange = (e) =>
        setConfitmationPassword(e.target.value);
    const handleFullNameChange = (e) => setFullName(e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            handleLogin(name, password);
        } else {
            handleRegister(
                email,
                password,
                confirmationPassword,
                name,
                fullName,
            );
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className={styles.modalHeader}>
                <Modal.Title>{isLogin ? 'Log In' : 'Register'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
                <Form onSubmit={onSubmit}>
                    {!isLogin && (
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
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </Form.Group>
                            <Form.Group
                                controlId="formBasicFullName"
                                className={styles.formGroup}
                            >
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter full name"
                                    className={styles.formControl}
                                    value={fullName}
                                    onChange={handleFullNameChange}
                                />
                            </Form.Group>
                        </>
                    )}
                    <Form.Group
                        controlId="formBasicName"
                        className={styles.formGroup}
                    >
                        <Form.Label>Login</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter login"
                            className={styles.formControl}
                            value={name}
                            onChange={handleNameChange}
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
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </Form.Group>
                    {!isLogin && (
                        <Form.Group
                            controlId="formBasicConfirmationPassword"
                            className={styles.formGroup}
                        >
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                className={styles.formControl}
                                value={confirmationPassword}
                                onChange={handlePasswordConfirmationChange}
                            />
                        </Form.Group>
                    )}
                    <Button
                        variant="primary"
                        type="submit"
                        className={styles.submitButton}
                    >
                        {isLogin ? 'Log In' : 'Register'}
                    </Button>
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
    );
};

export default LoginModal;
