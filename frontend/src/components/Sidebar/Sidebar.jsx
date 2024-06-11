import React, { useState, useEffect } from 'react';
import {
    Accordion,
    Form,
    Nav,
    Button,
    OverlayTrigger,
    Tooltip,
    Container,
    Row,
    Col,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
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
    FaFill,
    FaAngleLeft,
    FaAngleRight,
} from 'react-icons/fa';

import TextItemsList from './TextItemsList';
import SaveModal from './SaveModal';

import styles from '../../styles/Sidebar.module.css';

const Sidebar = ({
    color,
    image,
    onSaveImage,
    onSaveImageToServer,
    onUpdateArtWork,
    onToolChange,
    onColorChange,
    onBrushSizeChange,
    selectedText,
    onSelectedText,
    selectedTool,
    onUpdateText,
    onDeleteText,
    texts,
    effectsValues,
    onEffectsValuesChange,
    brushType,
    onChangeBrushType,
    onUndo,
    onRedo,
}) => {
    const [brushSize, setBrushSize] = useState(0);
    const [localColor, setLocalColor] = useState(color);
    const [currentEffectsValues, setCurrentEffectsValues] =
        useState(effectsValues);

    const handleCurrentEffectsValuesChange = (effect, value) => {
        setCurrentEffectsValues((prevValues) => ({
            ...prevValues,
            [effect]: value,
        }));
    };
    const [modalOpen, setModalOpen] = useState(false);
    const user = useSelector((state) => state.auth.user);

    const handleSaveClick = () => {
        onSaveImage();
    };

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const handleUpdateText = (color, fontSize, selectedTextId) => {
        onUpdateText(color, fontSize, selectedTextId);
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

    useEffect(() => {
        if (effectsValues) {
            Object.keys(effectsValues).forEach((key) => {
                if (effectsValues[key] !== currentEffectsValues[key]) {
                    handleCurrentEffectsValuesChange(key, effectsValues[key]);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onUndo, onRedo]);

    return (
        <Nav className={`flex-column p-3 ${styles.sidebar}`}>
            <Nav.Item>
                <h5 className="mb-4">Edit Options</h5>
            </Nav.Item>
            <Accordion className="mt-1">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Effects</Accordion.Header>
                    <Accordion.Body>
                        <Nav.Item className="mb-3">
                            <div className="d-flex align-items-center">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={renderTooltip('Brightness')}
                                >
                                    <Form.Group className="me-3">
                                        <Form.Label>Brightness</Form.Label>
                                        <Form.Range
                                            min="-1"
                                            max="1"
                                            step="0.05"
                                            value={
                                                currentEffectsValues.brightness
                                            }
                                            onChange={(e) =>
                                                handleCurrentEffectsValuesChange(
                                                    'brightness',
                                                    e.target.value,
                                                )
                                            }
                                            onMouseUp={(e) =>
                                                onEffectsValuesChange(
                                                    'brightness',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </Form.Group>
                                </OverlayTrigger>
                            </div>
                        </Nav.Item>
                        <Nav.Item className="mb-3">
                            <div className="d-flex align-items-center">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={renderTooltip('Contrast')}
                                >
                                    <Form.Group className="me-3">
                                        <Form.Label>Contrast</Form.Label>
                                        <Form.Range
                                            min="-10"
                                            max="10"
                                            step="0.05"
                                            value={
                                                currentEffectsValues.contrast
                                            }
                                            onChange={(e) =>
                                                handleCurrentEffectsValuesChange(
                                                    'contrast',
                                                    e.target.value,
                                                )
                                            }
                                            onMouseUp={(e) =>
                                                onEffectsValuesChange(
                                                    'contrast',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </Form.Group>
                                </OverlayTrigger>
                            </div>
                        </Nav.Item>
                        <Nav.Item className="mb-3">
                            <div className="d-flex align-items-center">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={renderTooltip('Grayscale')}
                                >
                                    <Form.Group className="me-3">
                                        <Form.Label>Grayscale</Form.Label>
                                        <Form.Range
                                            min="1"
                                            max="7"
                                            step="0.05"
                                            value={
                                                currentEffectsValues.grayscale
                                            }
                                            onChange={(e) =>
                                                handleCurrentEffectsValuesChange(
                                                    'grayscale',
                                                    e.target.value,
                                                )
                                            }
                                            onMouseUp={(e) =>
                                                onEffectsValuesChange(
                                                    'grayscale',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </Form.Group>
                                </OverlayTrigger>
                            </div>
                        </Nav.Item>
                        <Nav.Item className="mb-3">
                            <div className="d-flex align-items-center">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={renderTooltip('Saturate')}
                                >
                                    <Form.Group className="me-3">
                                        <Form.Label>Saturate</Form.Label>
                                        <Form.Range
                                            min="-2"
                                            max="2"
                                            step="0.05"
                                            value={
                                                currentEffectsValues.saturate
                                            }
                                            onChange={(e) =>
                                                handleCurrentEffectsValuesChange(
                                                    'saturate',
                                                    e.target.value,
                                                )
                                            }
                                            onMouseUp={(e) =>
                                                onEffectsValuesChange(
                                                    'saturate',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </Form.Group>
                                </OverlayTrigger>
                            </div>
                        </Nav.Item>
                        <Nav.Item className="mb-3">
                            <div className="d-flex align-items-center">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={renderTooltip('Blur')}
                                >
                                    <Form.Group className="me-3">
                                        <Form.Label>Blur</Form.Label>
                                        <Form.Range
                                            min="0"
                                            max="100"
                                            step="5"
                                            value={currentEffectsValues.blur}
                                            onChange={(e) =>
                                                handleCurrentEffectsValuesChange(
                                                    'blur',
                                                    e.target.value,
                                                )
                                            }
                                            onMouseUp={(e) =>
                                                onEffectsValuesChange(
                                                    'blur',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </Form.Group>
                                </OverlayTrigger>
                            </div>
                        </Nav.Item>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <Accordion className="mt-1">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Tools</Accordion.Header>
                    <Accordion.Body>
                        <Nav.Item className="mb-3">
                            <Form.Label>Drawing Mode</Form.Label>
                            <div className="d-flex">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={renderTooltip('Select')}
                                >
                                    <Button
                                        variant={
                                            selectedTool === 'select'
                                                ? 'primary'
                                                : 'light'
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
                                            selectedTool === 'draw'
                                                ? 'primary'
                                                : 'light'
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
                                            selectedTool === 'erase'
                                                ? 'primary'
                                                : 'light'
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
                                            selectedTool === 'text'
                                                ? 'primary'
                                                : 'light'
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
                                        variant={
                                            selectedTool === 'rect'
                                                ? 'primary'
                                                : 'light'
                                        }
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
                                        variant={
                                            selectedTool === 'circle'
                                                ? 'primary'
                                                : 'light'
                                        }
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
                                        variant={
                                            brushType === 'pencil'
                                                ? 'primary'
                                                : 'light'
                                        }
                                        onClick={() =>
                                            onChangeBrushType('pencil')
                                        }
                                    >
                                        <FaPencilAlt />
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={renderTooltip('Brush')}
                                >
                                    <Button
                                        variant={
                                            brushType === 'brush'
                                                ? 'primary'
                                                : 'light'
                                        }
                                        onClick={() =>
                                            onChangeBrushType('brush')
                                        }
                                    >
                                        <FaPaintBrush />
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={renderTooltip('Spray')}
                                >
                                    <Button
                                        variant={
                                            brushType === 'spray'
                                                ? 'primary'
                                                : 'light'
                                        }
                                        onClick={() =>
                                            onChangeBrushType('spray')
                                        }
                                    >
                                        <FaSprayCan />
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={renderTooltip('Fill')}
                                >
                                    <Button
                                        variant={
                                            brushType === 'fill'
                                                ? 'primary'
                                                : 'light'
                                        }
                                        onClick={() =>
                                            onChangeBrushType('fill')
                                        }
                                    >
                                        <FaFill />
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
                                        <span style={{ fontSize: '14px' }}>
                                            ●
                                        </span>
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
                                        onClick={() =>
                                            handleBrushSizeChange(10)
                                        }
                                    >
                                        <span style={{ fontSize: '18px' }}>
                                            ●
                                        </span>
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
                                        onClick={() =>
                                            handleBrushSizeChange(15)
                                        }
                                    >
                                        <span style={{ fontSize: '22px' }}>
                                            ●
                                        </span>
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
                                        onClick={() =>
                                            handleBrushSizeChange(20)
                                        }
                                    >
                                        <span style={{ fontSize: '26px' }}>
                                            ●
                                        </span>
                                    </Button>
                                </OverlayTrigger>
                            </div>
                            <div
                                className="d-flex align-items-center mb-3"
                                style={{ position: 'relative' }}
                            >
                                <input
                                    type="range"
                                    min="5"
                                    max="100"
                                    step="5"
                                    value={brushSize}
                                    onChange={(e) =>
                                        handleBrushSizeChange(
                                            parseInt(e.target.value),
                                        )
                                    }
                                    style={{ marginRight: '10px' }}
                                />
                                <span
                                    style={{
                                        fontSize: `${brushSize + 6}px`,
                                        position: 'absolute',
                                        left: '130px',
                                        top: '40%',
                                        transform: 'translateY(-50%)',
                                    }}
                                >
                                    ●
                                </span>
                            </div>
                        </Nav.Item>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <Accordion className="mt-1">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Color</Accordion.Header>
                    <Accordion.Body>
                        <Nav.Item className="mb-3">
                            <Form.Label>Sketch Picker</Form.Label>
                            <div className="d-flex justify-content-center">
                                <SketchPicker
                                    color={localColor}
                                    width="100%"
                                    height="100%"
                                    onChangeComplete={handleColorChange}
                                />
                            </div>
                        </Nav.Item>

                        <Nav.Item className="mb-3">
                            <Form.Label>SwatchesPicker</Form.Label>
                            <SwatchesPicker
                                color={localColor}
                                width="100%"
                                height="100%"
                                onChangeComplete={handleColorChange}
                            />
                        </Nav.Item>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <TextItemsList
                texts={texts}
                selectedText={selectedText}
                handleTextSelection={handleTextSelection}
                onUpdateText={handleUpdateText}
                onDeleteText={onDeleteText}
            />
            {image && (
                <Nav.Item className="mt-3 d-flex align-items-center">
                    <Button
                        variant="primary"
                        className="mx-1"
                        onClick={handleSaveClick}
                    >
                        Save Image
                    </Button>
                    <Container fluid className="fixed-bottom bg-light p-2">
                        <Row>
                            <Col className="d-flex justify-content-between">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={renderTooltip('Undo')}
                                >
                                    <Button onClick={onUndo}>
                                        <FaAngleLeft />
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={renderTooltip('Redo')}
                                >
                                    <Button onClick={onRedo}>
                                        <FaAngleRight />
                                    </Button>
                                </OverlayTrigger>
                            </Col>
                        </Row>
                    </Container>
                    {user && (
                        <div>
                            <Button
                                variant="primary"
                                className="mx-1"
                                onClick={toggleModal}
                            >
                                Save To Library
                            </Button>
                            <Button
                                variant="primary"
                                className="mx-1"
                                onClick={onUpdateArtWork}
                            >
                                Save Changes
                            </Button>
                            <SaveModal
                                show={modalOpen}
                                handleSave={onSaveImageToServer}
                                handleClose={toggleModal}
                            />
                        </div>
                    )}
                </Nav.Item>
            )}
        </Nav>
    );
};

export default Sidebar;
