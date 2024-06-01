import React, { useState } from 'react';
import {
    Form,
    Nav,
    Badge,
    ProgressBar,
    Button,
    OverlayTrigger,
    Tooltip,
    ListGroup,
} from 'react-bootstrap';
import { SketchPicker, SwatchesPicker } from 'react-color';
import { AiOutlineSelect } from 'react-icons/ai';
import { BiText } from 'react-icons/bi';
import {
    FaPaintBrush,
    FaEraser,
    FaPencilAlt,
    FaSquare,
    FaCircle,
    FaSprayCan,
} from 'react-icons/fa';

import styles from '../styles/Sidebar.module.css';

const Sidebar = ({
    imageSize,
    scale,
    color,
    onScaleChange,
    onSaveImage,
    onToolChange,
    onBrushChange,
    onColorChange,
    onBrushSizeChange,
    selectedText,
    onSelectedText,
    selectedTool,
    texts,
}) => {
    const [brushSize, setBrushSize] = useState(0);
    const [localColor, setLocalColor] = useState(color);

    const handleSaveClick = () => {
        onSaveImage();
    };

    const handleColorChange = (color) => {
        setLocalColor(color.hex);
        onColorChange(color.hex);
    };

    const handleBrushSizeChange = (size) => {
        setBrushSize(size);
        onBrushSizeChange(size);
    };

    const handleTextSelection = (index) => {
        onSelectedText(index);
    };

    const renderTooltip = (text) => (
        <Tooltip id="button-tooltip">{text}</Tooltip>
    );

    return (
        <Nav className={`flex-column p-3 `}>
            <Nav.Item>
                <h5 className="mb-4">Edit Options</h5>
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
                        overlay={renderTooltip('Select')}
                    >
                        <Button
                            variant={
                                selectedTool === 'select' ? 'primary' : 'light'
                            }
                            onClick={() => onToolChange('select')}
                        >
                            <AiOutlineSelect />
                        </Button>
                    </OverlayTrigger>
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
                        overlay={renderTooltip('Text')}
                    >
                        <Button
                            variant={
                                selectedTool === 'text' ? 'primary' : 'light'
                            }
                            onClick={() => onToolChange('text')}
                        >
                            <BiText />
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
                <div
                    className="d-flex align-items-center"
                    style={{ position: 'relative' }}
                >
                    <input
                        type="range"
                        min="5"
                        max="100"
                        step="5"
                        value={brushSize}
                        onChange={(e) =>
                            handleBrushSizeChange(parseInt(e.target.value))
                        }
                        style={{ marginRight: '10px' }}
                    />
                    <span
                        style={{
                            fontSize: `${brushSize + 6}px`,
                            position: 'absolute',
                            left: '130px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                        }}
                    >
                        ●
                    </span>
                </div>
            </Nav.Item>

            <Nav.Item className="mb-3">
                <Button variant="primary" onClick={handleSaveClick}>
                    Save Image
                </Button>
            </Nav.Item>
            <Nav.Item className="mb-3">
                <Form.Label>Brush Color</Form.Label>

                <SketchPicker
                    color={localColor}
                    width="99%"
                    height="100%"
                    onChangeComplete={handleColorChange}
                />
            </Nav.Item>
            <Nav.Item className="mb-3">
                <Form.Label>Brush Color</Form.Label>
                <SwatchesPicker
                    color={localColor}
                    width="100%"
                    height="100%"
                    onChangeComplete={handleColorChange}
                />
            </Nav.Item>
            <Nav.Item className="mb-3">
                <Form.Label>Texts</Form.Label>
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
                                    <span className={styles.textProperty}>
                                        Text:
                                    </span>
                                    <span className={styles.textValue}>
                                        {textItem.text}
                                    </span>
                                </div>
                                <div className={styles.textRow}>
                                    <span className={styles.textProperty}>
                                        Color:
                                    </span>
                                    <span
                                        className={styles.colorSwatch}
                                        style={{
                                            backgroundColor: textItem.color,
                                        }}
                                    ></span>
                                </div>
                                <div className={styles.textRow}>
                                    <span className={styles.textProperty}>
                                        Font Size:
                                    </span>
                                    <span className={styles.textValue}>
                                        {textItem.fontSize}px
                                    </span>
                                </div>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Nav.Item>
        </Nav>
    );
};

export default Sidebar;
