import React from 'react';
import { Form, Nav, Badge, ProgressBar } from 'react-bootstrap';

const Sidebar = ({ imageSize, scale, onScaleChange }) => {
    return (
        <Nav className="flex-column p-3 bg-light rounded">
            <Nav.Item>
                <h5 className="mb-4">Edit Options</h5>
            </Nav.Item>
            <Nav.Item className="mb-3">
                <Form.Label>Brightness</Form.Label>
                <Form.Control
                    type="range"
                    min="0"
                    max="200"
                    defaultValue="100"
                    className="custom-range"
                />
            </Nav.Item>
            <Nav.Item className="mb-3">
                <Form.Label>Contrast</Form.Label>
                <Form.Control
                    type="range"
                    min="0"
                    max="200"
                    defaultValue="100"
                    className="custom-range"
                />
            </Nav.Item>
            <Nav.Item className="mb-3">
                <Form.Label>Saturation</Form.Label>
                <Form.Control
                    type="range"
                    min="0"
                    max="200"
                    defaultValue="100"
                    className="custom-range"
                />
            </Nav.Item>
            <Nav.Item className="mb-3">
                <Form.Label>Image Size</Form.Label>
                <div>
                    <Badge variant="primary" className="mr-2">{`${Math.round(
                        imageSize.width,
                    )}px`}</Badge>
                    {' x '}
                    <Badge variant="secondary">{`${Math.round(
                        imageSize.height,
                    )}px`}</Badge>
                </div>
            </Nav.Item>
            <Nav.Item className="mb-3">
                <Form.Label>Scale</Form.Label>
                <div>
                    <input
                        type="range"
                        min={12.5}
                        max={800}
                        value={scale * 100}
                        className="custom-range"
                        onChange={(e) =>
                            onScaleChange(parseInt(e.target.value) / 100)
                        }
                    />
                    <ProgressBar
                        now={scale * 100}
                        label={`${Math.round(scale * 100)}%`}
                        className="mt-2"
                    />
                </div>
            </Nav.Item>
        </Nav>
    );
};

export default Sidebar;
