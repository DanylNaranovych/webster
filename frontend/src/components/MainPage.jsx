import React, { useState } from 'react';
import Konva from 'konva';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../styles/MainPage.module.css';

import Header from './Header';
import Sidebar from './Sidebar/Sidebar';
import PhotoEditor from './PhotoEditor/PhotoEditor';

const MainPage = () => {
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [scale, setScale] = useState(1);
    const [image, setImage] = useState(null);
    const [lineSize, setLineSize] = useState(2);
    const [lines, setLines] = useState([]);
    const [texts, setTexts] = useState([]);
    const [selectedText, setSelectedText] = useState(null);
    const [selectedTool, setSelectedTool] = useState('select');
    const [color, setColor] = useState('#000');
    const [effectsValues, setEffectsValues] = useState({
        brightness: 0,
        contrast: 0,
        grayscale: 0,
        saturate: 0,
        blur: 0,
    });

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
            [effect]: value,
        }));
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

    const handleToolChange = (mode) => {
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

        tempLayer.add(tempImage);

        lines.forEach((line) => {
            const tempLine = new Konva.Line({
                points: line.points,
                stroke: line.color,
                strokeWidth: line.drawingSize,
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

    return (
        <div>
            <Header />
            <Container fluid>
                <Row>
                    <Col xs={9} className={styles.col}>
                        <PhotoEditor
                            onImageSizeChange={handleImageSizeChange}
                            onScaleChange={handleScaleChange}
                            scale={scale}
                            drawColor={color}
                            drawingSize={lineSize}
                            selectedTool={selectedTool}
                            onSaveImage={handleSaveImage}
                            onSaveLines={setLines}
                            texts={texts}
                            setTexts={setTexts}
                            onSelectedText={handleSelectText}
                            selectedText={selectedText}
                            effectsValues={effectsValues}
                        />
                    </Col>

                    <Col xs={3} className={styles.col}>
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
                                effectsValues={effectsValues}
                                onEffectsValuesChange={handleEffectsValuesChange}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MainPage;
