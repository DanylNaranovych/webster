import React, { useState } from 'react';
import {
    Form,
    Nav,
    Badge,
    ProgressBar,
    Button,
    OverlayTrigger,
    Tooltip,
} from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import {
    FaPaintBrush,
    FaEraser,
    FaPencilAlt,
    FaRuler,
    FaSquare,
    FaCircle,
    FaSprayCan,
} from 'react-icons/fa';

const Sidebar = ({
    imageSize,
    scale,
    onScaleChange,
    onSaveImage,
    onToolChange,
    onBrushChange,
    onColorChange,
    onBrushSizeChange,
    selectedTool,
}) => {
    const [color, setColor] = useState('#000');
    const [brushSize, setBrushSize] = useState(0);

    const handleSaveClick = () => {
        onSaveImage();
    };

    const handleColorChange = (color) => {
        setColor(color.hex);
        onColorChange(color.hex);
    };

    const handleBrushSizeChange = (size) => {
        setBrushSize(size);
        onBrushSizeChange(size);
    };

    const renderTooltip = (text) => (
        <Tooltip id="button-tooltip">{text}</Tooltip>
    );

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
            <Nav.Item className="mb-3">
                <Form.Label>Drawing Mode</Form.Label>
                <div className="d-flex">
                    <OverlayTrigger
                        placement="top"
                        overlay={renderTooltip('Draw')}
                    >
                        <Button
                            variant={
                                selectedTool === 'draw' ? 'primary' : 'light'
                            }
                            onClick={() => onToolChange('draw')}
                        >
                            <FaPencilAlt />
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={renderTooltip('Erase')}
                    >
                        <Button
                            variant={
                                selectedTool === 'erase' ? 'primary' : 'light'
                            }
                            onClick={() => onToolChange('erase')}
                        >
                            <FaEraser />
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={renderTooltip('Line')}
                    >
                        <Button
                            variant="light"
                            onClick={() => onToolChange('line')}
                        >
                            <FaRuler />
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={renderTooltip('Rectangle')}
                    >
                        <Button
                            variant="light"
                            onClick={() => onToolChange('rect')}
                        >
                            <FaSquare />
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={renderTooltip('Circle')}
                    >
                        <Button
                            variant="light"
                            onClick={() => onToolChange('circle')}
                        >
                            <FaCircle />
                        </Button>
                    </OverlayTrigger>
                </div>
            </Nav.Item>
            <Nav.Item className="mb-3">
                <Form.Label>Brush Type</Form.Label>
                <div className="d-flex">
                    <OverlayTrigger
                        placement="top"
                        overlay={renderTooltip('Pencil')}
                    >
                        <Button
                            variant="light"
                            onClick={() => onBrushChange('pencil')}
                        >
                            <FaPencilAlt />
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={renderTooltip('Brush')}
                    >
                        <Button
                            variant="light"
                            onClick={() => onBrushChange('brush')}
                        >
                            <FaPaintBrush />
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={renderTooltip('Spray')}
                    >
                        <Button
                            variant="light"
                            onClick={() => onBrushChange('spray')}
                        >
                            <FaSprayCan />
                        </Button>
                    </OverlayTrigger>
                </div>
            </Nav.Item>
            <Nav.Item className="mb-3">
                <Form.Label>Brush Size</Form.Label>
                <div className="d-flex align-items-center">
                    <OverlayTrigger
                        placement="top"
                        overlay={renderTooltip('Small')}
                    >
                        <Button
                            variant="light"
                            className={`mr-2 ${
                                brushSize === 5 ? 'active' : ''
                            }`}
                            onClick={() => handleBrushSizeChange(5)}
                        >
                            <span style={{ fontSize: '14px' }}>●</span>
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={renderTooltip('Medium')}
                    >
                        <Button
                            variant="light"
                            className={`mr-2 ${
                                brushSize === 10 ? 'active' : ''
                            }`}
                            onClick={() => handleBrushSizeChange(10)}
                        >
                            <span style={{ fontSize: '18px' }}>●</span>
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={renderTooltip('Large')}
                    >
                        <Button
                            variant="light"
                            className={`mr-2 ${
                                brushSize === 15 ? 'active' : ''
                            }`}
                            onClick={() => handleBrushSizeChange(15)}
                        >
                            <span style={{ fontSize: '22px' }}>●</span>
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={renderTooltip('Extra Large')}
                    >
                        <Button
                            variant="light"
                            className={`mr-2 ${
                                brushSize === 20 ? 'active' : ''
                            }`}
                            onClick={() => handleBrushSizeChange(20)}
                        >
                            <span style={{ fontSize: '26px' }}>●</span>
                        </Button>
                    </OverlayTrigger>
                </div>
            </Nav.Item>
            <Nav.Item className="mb-3">
                <Form.Label>Brush Color</Form.Label>
                <SketchPicker
                    color={color}
                    onChangeComplete={handleColorChange}
                />
            </Nav.Item>
            <Nav.Item className="mb-3">
                <Button variant="primary" onClick={handleSaveClick}>
                    Save Image
                </Button>
            </Nav.Item>
        </Nav>
    );
};

export default Sidebar;
