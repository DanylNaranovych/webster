import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from '../styles/Message.module.css';

const Message = ({ show, message, onClose }) => {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header
                closeButton
                className={`custom-header  ${styles.modalHeader}`}
            ></Modal.Header>
            <Modal.Body className={`custom-body ${styles.modalBody} `}>
                {message}
            </Modal.Body>
            <Modal.Footer className={`custom-footer `}>
                <Button
                    variant="light"
                    className={styles.button}
                    onClick={onClose}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Message;
