import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import PhotoEditor from './PhotoEditor/PhotoEditor';
import Message from './Message';
import { serializeData } from '../utils/jsonUtils';
import {
    clearArtWork,
    createArtWork,
    getArtWork,
    updateArtWork,
} from '../store/actions/artWork';
import { handleDownload } from '../utils/saveUtils';
import { dataURItoBlob } from '../utils/urlUtils';
import styles from '../styles/MainPage.module.css';

const MainPage = () => {
    const dispatch = useDispatch();
    const message = useSelector((state) => state.auth.message);
    const artWork = useSelector((state) => state.artWork.artWork);
    const [showMessage, setShowMessage] = useState(false);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [scale, setScale] = useState(1);
    const [image, setImage] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [lineSize, setLineSize] = useState(2);
    const [lines, setLines] = useState([]);
    const [texts, setTexts] = useState([]);
    const [figures, setFigures] = useState([]);
    const [selectedText, setSelectedText] = useState(null);
    const [selectedTool, setSelectedTool] = useState('select');
    const [brushType, setBrushType] = useState('pencil');
    const [color, setColor] = useState('#000');
    const [historyStep, setHistoryStep] = useState(0);
    const [effectsValues, setEffectsValues] = useState({
        brightness: 0,
        contrast: 0,
        grayscale: 0,
        saturate: 0,
        blur: 0,
    });

    const [history, setHistory] = useState([
        {
            effectsValues: {
                brightness: 0,
                contrast: 0,
                grayscale: 0,
                saturate: 0,
                blur: 0,
            },
            lines: [],
            texts: [],
            figures: [],
        },
    ]);

    const { id } = useParams();

    const addEffectsToHistory = (newEffectsValues) => {
        const previousHistoryItem = history[historyStep];

        const newHistoryItem = {
            effectsValues: newEffectsValues,
            lines: previousHistoryItem.lines,
            texts: previousHistoryItem.texts,
            figures: previousHistoryItem.figures,
        };

        const newHistory = [
            ...history.slice(0, historyStep + 1),
            newHistoryItem,
        ];
        setHistory(newHistory);
        setHistoryStep(historyStep + 1);
    };

    const addLinesToHistory = (newLines) => {
        const previousHistoryItem = history[historyStep];

        const newHistoryItem = {
            effectsValues: previousHistoryItem.effectsValues,
            lines: newLines,
            texts: previousHistoryItem.texts,
            figures: previousHistoryItem.figures,
        };

        const newHistory = [
            ...history.slice(0, historyStep + 1),
            newHistoryItem,
        ];
        setHistory(newHistory);
        setHistoryStep(historyStep + 1);
    };

    const addTextsToHistory = (newTexts) => {
        const previousHistoryItem = history[historyStep];

        const newHistoryItem = {
            effectsValues: previousHistoryItem.effectsValues,
            lines: previousHistoryItem.lines,
            texts: newTexts,
            figures: previousHistoryItem.figures,
        };

        const newHistory = [
            ...history.slice(0, historyStep + 1),
            newHistoryItem,
        ];
        setHistory(newHistory);
        setHistoryStep(historyStep + 1);
    };

    const addFiguresToHistory = (newFigures) => {
        const previousHistoryItem = history[historyStep];

        const newHistoryItem = {
            effectsValues: previousHistoryItem.effectsValues,
            lines: previousHistoryItem.lines,
            texts: previousHistoryItem.texts,
            figures: newFigures,
        };

        const newHistory = [
            ...history.slice(0, historyStep + 1),
            newHistoryItem,
        ];
        setHistory(newHistory);
        setHistoryStep(historyStep + 1);
    };

    useEffect(() => {
        if (id) {
            dispatch(getArtWork(id));
        } else {
            dispatch(clearArtWork());
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (artWork) {
            const filename = artWork.content.image.imageSrc.split('/').pop();
            setImageSrc(`http://127.0.0.1:8000/${filename}`);
        }
    }, [artWork, imageSrc]);

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
        if (Number(value) === history[historyStep].effectsValues[effect]) {
            return;
        }

        const newEffectsValues = {
            ...effectsValues,

            [effect]: Number(value),
        };

        setEffectsValues(newEffectsValues);
        addEffectsToHistory(newEffectsValues);
    };

    const handleLinesSave = (newLines) => {
        if (newLines === history[historyStep].lines) {
            return;
        }

        setLines(newLines);
        addLinesToHistory(newLines);
    };

    const handleTextsSave = (newTexts) => {
        if (newTexts === history[historyStep].texts) {
            return;
        }

        setTexts(newTexts);
        addTextsToHistory(newTexts);
    };

    const handleFiguresSave = (newFigures) => {
        if (newFigures === history[historyStep].figures) {
            return;
        }

        setFigures(newFigures);
        addFiguresToHistory(newFigures);
    };

    const handleChangeBrushType = (brushType) => {
        setBrushType(brushType);
        setSelectedTool('draw');
    };

    const handleImageSizeChange = (newSize) => {
        setImageSize(newSize);
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

            const file = new FormData();
            if (artWork) {
                fetch(imageSrc)
                    .then((response) => response.blob())
                    .then((blob) => {
                        file.append('photo', blob, 'filename.jpg');
                        dispatch(createArtWork(data, file));
                    })
                    .catch((error) => {
                        console.error('Ошибка при загрузке файла:', error);
                    });
            } else {
                var blob = dataURItoBlob(imageSrc);
                file.append('photo', blob, 'image.png');
                dispatch(createArtWork(data, file));
            }

            setShowMessage(true);
        }
    };

    const handleUpdateArtWork = () => {
        const data = {
            content: serializeData(
                imageSize,
                lines,
                texts,
                figures,
                effectsValues,
            ),
            name: artWork.name,
            description: artWork.description,
        };
        const file = new FormData();
        fetch(imageSrc)
            .then((response) => response.blob())
            .then((blob) => {
                file.append('photo', blob, 'filename.jpg');
                dispatch(createArtWork(data, file));
            })
            .catch((error) => {
                console.error('Ошибка при загрузке файла:', error);
            });
        dispatch(updateArtWork(data, file, artWork.id));
        setShowMessage(true);
    };

    const handleRedo = () => {
        if (historyStep === history.length - 1) {
            return;
        }
        setHistoryStep(historyStep + 1);
        setEffectsValues(history[historyStep + 1].effectsValues);
        setLines(history[historyStep + 1].lines);
        setTexts(history[historyStep + 1].texts);
        setFigures(history[historyStep + 1].figures);
    };

    const handleUndo = () => {
        console.log(history);
        console.log(historyStep);
        if (historyStep === 0) {
            return;
        }
        setHistoryStep(historyStep - 1);
        setEffectsValues(history[historyStep - 1].effectsValues);
        setLines(history[historyStep - 1].lines);
        setTexts(history[historyStep - 1].texts);
        setFigures(history[historyStep - 1].figures);
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
                            onSaveLines={handleLinesSave}
                            texts={texts}
                            imageSrc={imageSrc}
                            image={image}
                            setImage={setImage}
                            setImageSrc={setImageSrc}
                            artWork={artWork}
                            setTexts={handleTextsSave}
                            annotations={figures}
                            setAnnotations={handleFiguresSave}
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
                                onUpdateArtWork={handleUpdateArtWork}
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
                                onUndo={handleUndo}
                                onRedo={handleRedo}
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
