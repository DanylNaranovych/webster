import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import PhotoEditor from './PhotoEditor/PhotoEditor';
import Message from './Message';
import { serializeData } from '../utils/jsonUtils';
import { createArtWork, getArtWork } from '../store/actions/artWork';
import { handleDownload } from '../utils/saveUtils';
import styles from '../styles/MainPage.module.css';

const MainPage = () => {
    const dispatch = useDispatch();
    const message = useSelector((state) => state.auth.message);
    const [showMessage, setShowMessage] = useState(false);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [scale, setScale] = useState(1);
    const [image, setImage] = useState(null);
    const [lineSize, setLineSize] = useState(2);
    const [lines, setLines] = useState([]);
    const [texts, setTexts] = useState([]);
    const [figures, setFigures] = useState([]);
    const [selectedText, setSelectedText] = useState(null);
    const [selectedTool, setSelectedTool] = useState('select');
    const [brushType, setBrushType] = useState('pencil');
    const [color, setColor] = useState('#000');
    const [effectsValues, setEffectsValues] = useState({
        brightness: 0,
        contrast: 0,
        grayscale: 0,
        saturate: 0,
        blur: 0,
    });
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(getArtWork(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            const message =
                'You have unsaved data. Are you sure you want to close this page?';
            event.returnValue = message;
            return message;
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const handleDeleteFigure = (id) => {
        setFigures(figures.filter((figure) => figure.key !== id));
    };

    const handleDeleteText = (textId) => {
        setTexts((prevTexts) =>
            prevTexts.filter((textItem) => textItem.id !== textId),
        );
    };

    const handleUpdateText = (color, fontSize, selectedTextId) => {
        if (selectedTextId) {
            const updatedTexts = texts.map((text) => {
                if (text.id === selectedTextId) {
                    return {
                        ...text,
                        color: color,
                        fontSize: fontSize,
                    };
                }
                return text;
            });
            setTexts([...updatedTexts]);
        }
    };

    const handleEffectsValuesChange = (effect, value) => {
        setEffectsValues((prevValues) => ({
            ...prevValues,
            [effect]: Number(value),
        }));
    };

    const handleChangeBrushType = (brushType) => {
        setBrushType(brushType);
        setSelectedTool('draw');
    };

    const handleImageSizeChange = (newSize) => {
        setImageSize(newSize);
    };

    const handleSaveLines = (newLines) => {
        setLines(newLines);
    };

    const handleScaleChange = (newScale) => {
        setScale(newScale);
    };

    const handleColorChange = (color) => {
        setColor(color);
    };

    const handleLineSizeChange = (size) => {
        setLineSize(size);
    };

    const handleSaveImage = (image) => {
        setImage(image);
    };

    const handleCloseMessage = () => setShowMessage(false);

    const handleToolChange = (mode) => {
        if (mode === 'erase') {
            setBrushType(null);
        }
        setSelectedTool(mode);
    };

    const handleSelectText = (index) => {
        setSelectedText(index);
    };

    const handleSave = () => {
        if (image) {
            handleDownload(
                effectsValues,
                lines,
                texts,
                figures,
                imageSize,
                image,
            );
        }
    };

    const handleSaveToServer = (name, description) => {
        if (image) {
            console.log(name, description);
            const data = {
                content: serializeData(
                    imageSize,
                    lines,
                    texts,
                    figures,
                    effectsValues,
                ),
                name: name,
                description: description,
            };
            dispatch(createArtWork(data));
            setShowMessage(true);
        }
    };

    return (
        <div>
            <Header />
            <Container fluid>
                <Row>
                    <Col xs={9} className={styles.col} style={{ padding: 0 }}>
                        <PhotoEditor
                            onImageSizeChange={handleImageSizeChange}
                            onScaleChange={handleScaleChange}
                            scale={scale}
                            drawColor={color}
                            drawingSize={lineSize}
                            selectedTool={selectedTool}
                            onSaveImage={handleSaveImage}
                            onSaveLines={handleSaveLines}
                            texts={texts}
                            setTexts={setTexts}
                            annotations={figures}
                            setAnnotations={setFigures}
                            deleteAnnotation={handleDeleteFigure}
                            onSelectedText={handleSelectText}
                            selectedText={selectedText}
                            effectsValues={effectsValues}
                            brushType={brushType}
                        />
                    </Col>

                    <Col xs={3} className={styles.col} style={{ padding: 0 }}>
                        <div
                            style={{
                                height: '95vh',
                                overflowY: 'auto',
                            }}
                        >
                            <Sidebar
                                color={color}
                                image={image}
                                onColorChange={handleColorChange}
                                onSaveImage={handleSave}
                                onSaveImageToServer={handleSaveToServer}
                                onBrushSizeChange={handleLineSizeChange}
                                onToolChange={handleToolChange}
                                selectedTool={selectedTool}
                                texts={texts}
                                selectedText={selectedText}
                                onSelectedText={handleSelectText}
                                onUpdateText={handleUpdateText}
                                onDeleteText={handleDeleteText}
                                effectsValues={effectsValues}
                                onEffectsValuesChange={
                                    handleEffectsValuesChange
                                }
                                brushType={brushType}
                                onChangeBrushType={handleChangeBrushType}
                            />
                        </div>
                    </Col>
                </Row>
                <Message
                    message={message}
                    onClose={handleCloseMessage}
                    show={showMessage}
                />
            </Container>
        </div>
    );
};

export default MainPage;
