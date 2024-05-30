import React, { useState } from 'react';
import Konva from 'konva';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../styles/MainPage.module.css';

import Header from './Header';
import Sidebar from './Sidebar';
import PhotoEditor from './PhotoEditor/PhotoEditor';

const MainPage = () => {
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [scale, setScale] = useState(1);
    const [image, setImage] = useState(null);
    const [lineSize, setLineSize] = useState(2);
    const [lines, setLines] = useState([]);
    const [selectedTool, setSelectedTool] = useState('select');
    const [color, setColor] = useState('#000');

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
                                imageSize={imageSize}
                                scale={scale}
                                color={color}
                                onColorChange={handleColorChange}
                                onScaleChange={handleScaleChange}
                                onSaveImage={handleSave}
                                onBrushSizeChange={handleLineSizeChange}
                                onToolChange={handleToolChange}
                                selectedTool={selectedTool}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MainPage;
