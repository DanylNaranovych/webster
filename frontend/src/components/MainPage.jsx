import React, { useState, useEffect } from 'react';
import Konva from 'konva';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../styles/MainPage.module.css';

import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import PhotoEditor from './PhotoEditor/PhotoEditor';

const MainPage = () => {
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

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            const message =
                'У вас есть несохраненные данные. Вы уверены, что хотите покинуть эту страницу?';
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
        const tempContainer = document.createElement('div');
        document.body.appendChild(tempContainer);

        const tempStage = new Konva.Stage({
            container: tempContainer,
            width: imageSize.width,
            height: imageSize.height,
        });

        const tempLayer = new Konva.Layer();

        const tempImage = new Konva.Image({
            image: image,
            width: imageSize.width,
            height: imageSize.height,
        });

        tempImage.cache();
        const filters = [];

        if (effectsValues.brightness !== 0) {
            filters.push(Konva.Filters.Brighten);
            tempImage.brightness(effectsValues.brightness);
        }
        if (effectsValues.contrast !== 0) {
            filters.push(Konva.Filters.Contrast);
            tempImage.contrast(effectsValues.contrast);
        }
        if (effectsValues.grayscale !== 0 || effectsValues.saturate !== 0) {
            filters.push(Konva.Filters.HSL);
            tempImage.saturation(
                effectsValues.saturate - effectsValues.grayscale,
            );
        }
        if (effectsValues.blur !== 0) {
            filters.push(Konva.Filters.Blur);
            tempImage.blurRadius(effectsValues.blur);
        }

        tempImage.filters(filters);

        tempLayer.add(tempImage);

        lines.forEach((line) => {
            const tempLine = new Konva.Line({
                points: line.points,
                stroke: line.color,
                strokeWidth: line.size,
            });
            tempLayer.add(tempLine);
        });

        texts.forEach((textData) => {
            const tempText = new Konva.Text({
                x: textData.x,
                y: textData.y,
                text: textData.text,
                fontSize: textData.fontSize,
                fontFamily: textData.fontFamily,
                fill: textData.color,
            });
            tempLayer.add(tempText);
        });

        figures.forEach((figure) => {
            const tempText = new Konva.Rect({
                x: figure.x,
                y: figure.y,
                width: figure.width,
                height: figure.height,
                fill: figure.fill,
                stroke: figure.color,
                strokeWidth: figure.size,
            });
            tempLayer.add(tempText);
        });

        tempStage.add(tempLayer);

        const uri = tempStage.toDataURL();

        const link = document.createElement('a');
        link.href = uri;
        link.download = 'edited_image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        tempLayer.destroy();
        tempContainer.remove();
    };

    // const serializeData = () => {
    //     const data = {
    //         imageSize: {
    //             width: imageSize.width,
    //             height: imageSize.height,
    //         },

    //         lines: lines.map((line) => ({
    //             points: line.points,
    //             color: line.color,
    //             size: line.size,
    //         })),

    //         texts: texts.map((textData) => ({
    //             id: textData.id,
    //             x: textData.x,
    //             y: textData.y,
    //             text: textData.text,
    //             fontSize: textData.fontSize,
    //             fontFamily: textData.fontFamily,
    //             color: textData.color,
    //         })),

    //         figures: figures.map((figure) => ({
    //             id: figure.key,
    //             x: figure.x,
    //             y: figure.y,
    //             tool: figure.tool,
    //             width: figure.width,
    //             height: figure.height,
    //             fill: figure.fill,
    //             color: figure.color,
    //             size: figure.size,
    //         })),

    //         effectsValues: {
    //             brightness: effectsValues.brightness,
    //             contrast: effectsValues.contrast,
    //             grayscale: effectsValues.grayscale,
    //             saturate: effectsValues.saturate,
    //             blur: effectsValues.blur,
    //         },
    //     };

    //     return JSON.stringify(data, null, 2);
    // };

    // const deserializeData = (jsonString) => {
    //     const data = JSON.parse(jsonString);

    //     const imageSize = {
    //         width: data.imageSize.width,
    //         height: data.imageSize.height,
    //     };

    //     const lines = data.lines.map((line) => ({
    //         points: line.points,
    //         color: line.color,
    //         size: line.size,
    //     }));

    //     const texts = data.texts.map((textData) => ({
    //         id: textData.id,
    //         x: textData.x,
    //         y: textData.y,
    //         text: textData.text,
    //         fontSize: textData.fontSize,
    //         fontFamily: textData.fontFamily,
    //         color: textData.color,
    //     }));

    //     const figures = data.figures.map((figure) => ({
    //         key: figure.id,
    //         x: figure.x,
    //         y: figure.y,
    //         tool: figure.tool,
    //         width: figure.width,
    //         height: figure.height,
    //         fill: figure.fill,
    //         color: figure.color,
    //         size: figure.size,
    //     }));

    //     return {
    //         imageSize,
    //         lines,
    //         texts,
    //         figures,
    //     };
    // };

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
                                onColorChange={handleColorChange}
                                onSaveImage={handleSave}
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
            </Container>
        </div>
    );
};

export default MainPage;
