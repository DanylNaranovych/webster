import React, { useState, useEffect } from 'react';
import {
    Accordion,
    Button,
    ListGroup,
    Form,
    Modal,
    Nav,
} from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import styles from '../../styles/Sidebar.module.css';

const TextItemsList = ({
    texts,
    selectedText,
    handleTextSelection,
    onUpdateText,
    onDeleteText,
}) => {
    const [showModal, setShowModal] = useState(false);
    const [newColor, setNewColor] = useState('');
    const [newFontSize, setNewFontSize] = useState('');
    const [selectedTextId, setSelectedTextId] = useState(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Delete' && selectedText !== null) {
                onDeleteText(selectedText);
                handleTextSelection(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedText, onDeleteText, handleTextSelection]);

    const handleChange = (textId) => {
        setSelectedTextId(textId);
        const selectedText = texts.find((textItem) => textItem.id === textId);
        if (selectedText) {
            setNewColor(selectedText.color);
            setNewFontSize(selectedText.fontSize);
            setShowModal(true);
        }
    };

    const handleSaveChanges = () => {
        onUpdateText(newColor, newFontSize, selectedTextId);
        setShowModal(false);
        setNewColor('');
        setNewFontSize('');
    };

    return (
        <Accordion className="mt-1">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Text</Accordion.Header>
                <Accordion.Body>
                    <Nav.Item className="mb-3">
                        <Form.Label>
                            {texts.length === 0 && (
                                <div className="text-center mt-3 mb-3">
                                    <span
                                        className="text-danger font-italic"
                                        style={{ fontSize: '18px' }}
                                    >
                                        No texts available
                                    </span>
                                </div>
                            )}
                        </Form.Label>
                        <ListGroup>
                            {texts.map((textItem, index) => (
                                <ListGroup.Item
                                    key={index}
                                    className={`list-group-item ${
                                        selectedText === textItem.id
                                            ? `${styles.selected}`
                                            : `${styles.textItem}`
                                    }`}
                                    onClick={() =>
                                        handleTextSelection(
                                            selectedText === textItem.id
                                                ? null
                                                : textItem.id,
                                        )
                                    }
                                >
                                    <div className={styles.cardContent}>
                                        <div className={styles.textRow}>
                                            <span
                                                className={styles.textProperty}
                                            >
                                                Text:
                                            </span>
                                            <span className={styles.textValue}>
                                                {textItem.text.slice(0, 30)}
                                                {textItem.text.length > 30
                                                    ? '...'
                                                    : ''}
                                            </span>
                                        </div>
                                        <div className={styles.textRow}>
                                            <span
                                                className={styles.textProperty}
                                            >
                                                Color:
                                            </span>
                                            <span
                                                className={styles.colorSwatch}
                                                style={{
                                                    backgroundColor:
                                                        textItem.color,
                                                }}
                                            ></span>
                                        </div>
                                        <div className={styles.textRow}>
                                            <span
                                                className={styles.textProperty}
                                            >
                                                Font Size:
                                            </span>
                                            <span className={styles.textValue}>
                                                {textItem.fontSize}px
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="light"
                                        className="mt-1"
                                        onClick={() =>
                                            handleChange(textItem.id)
                                        }
                                    >
                                        Change
                                    </Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Nav.Item>
                </Accordion.Body>
            </Accordion.Item>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Text Properties</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formColor">
                            <Form.Label>Color</Form.Label>
                            <div className="d-flex justify-content-center">
                                <SketchPicker
                                    width="100%"
                                    color={newColor}
                                    onChangeComplete={(color) =>
                                        setNewColor(color.hex)
                                    }
                                />
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formFontSize" className="mt-4">
                            <Form.Label>Font Size</Form.Label>
                            <Form.Control
                                type="number"
                                value={newFontSize}
                                onChange={(e) => setNewFontSize(e.target.value)}
                                className="w-100"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowModal(false)}
                    >
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Accordion>
    );
};

export default TextItemsList;
