import React from 'react';
import { Form, Nav, Badge, ProgressBar } from 'react-bootstrap';

const Sidebar = ({ imageSize, scale }) => {
    return (
        <Nav
            className="flex-column p-3"
            style={{ borderLeft: '1px solid #000000', height: `100vh` }}
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
                />
            </Nav.Item>
            <Nav.Item className="mb-3">
                <Form.Label>Contrast</Form.Label>
                <Form.Control
                    type="range"
                    min="0"
                    max="200"
                    defaultValue="100"
                />
            </Nav.Item>
            <Nav.Item className="mb-3">
                <Form.Label>Saturation</Form.Label>
                <Form.Control
                    type="range"
                    min="0"
                    max="200"
                    defaultValue="100"
                />
            </Nav.Item>

            <Nav.Item className="mb-3">
                <Form.Label>Image Size</Form.Label>
                <div>
                    <Badge variant="primary">{`${imageSize.width}px`}</Badge>
                    {' x '}
                    <Badge variant="secondary">{`${imageSize.height}px`}</Badge>
                </div>
            </Nav.Item>

            <Nav.Item className="mb-3">
                <Form.Label>Scale</Form.Label>
                <ProgressBar
                    now={scale * 100}
                    label={`${Math.round(scale * 100)}%`}
                />
            </Nav.Item>
        </Nav>
    );
};

export default Sidebar;
