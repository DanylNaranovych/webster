import React from 'react';
import { Nav, Form, Badge, ProgressBar } from 'react-bootstrap';

const ImageControls = ({ imageSize, scale, onScaleChange }) => (
    <div>
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
    </div>
);

export default ImageControls;
