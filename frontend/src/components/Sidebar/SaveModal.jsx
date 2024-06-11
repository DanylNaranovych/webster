import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const SaveModal = ({ show, handleClose, handleSave }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSaveClick = () => {
        handleSave(name, description);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="bg-primary text-white">
                <Modal.Title>Enter Name and Description</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription" className="mt-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-between">
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSaveClick}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SaveModal;
