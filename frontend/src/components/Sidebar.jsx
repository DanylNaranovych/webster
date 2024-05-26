import React from 'react';
import { Form, Nav } from 'react-bootstrap';

const Sidebar = ({ onEdit, imageLoaded }) => {
    return (
        <Nav
            className="flex-column p-3"
            style={{ height: '100vh', borderRight: '1px solid #ccc' }}
        >
            <Nav.Item>
                <h5>Edit Options</h5>
            </Nav.Item>

            <Nav.Item className="mb-3">
                <Form.Label>Brightness</Form.Label>
                <Form.Control
                    type="range"
                    min="0"
                    max="200"
                    defaultValue="100"
                    onChange={(e) => onEdit('brightness', e.target.value)}
                />
            </Nav.Item>
            <Nav.Item className="mb-3">
                <Form.Label>Contrast</Form.Label>
                <Form.Control
                    type="range"
                    min="0"
                    max="200"
                    defaultValue="100"
                    onChange={(e) => onEdit('contrast', e.target.value)}
                />
            </Nav.Item>
            <Nav.Item className="mb-3">
                <Form.Label>Saturation</Form.Label>
                <Form.Control
                    type="range"
                    min="0"
                    max="200"
                    defaultValue="100"
                    onChange={(e) => onEdit('saturation', e.target.value)}
                />
            </Nav.Item>
        </Nav>
    );
};

export default Sidebar;
