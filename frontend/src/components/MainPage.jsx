import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Header from './Header';
import Sidebar from './Sidebar';
import PhotoEditor from './PhotoEditor';

const MainPage = () => {
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [scale, setScale] = useState(1);

    const handleImageSizeChange = (newSize) => {
        setImageSize(newSize);
    };

    const handleScaleChange = (newScale) => {
        setScale(newScale);
    };

    return (
        <div>
            <Header />
            <Container fluid>
                <Row>
                    <Col xs={10}>
                        <PhotoEditor
                            onImageSizeChange={handleImageSizeChange}
                            onScaleChange={handleScaleChange}
                        />
                    </Col>
                    <Col xs={2}>
                        <Sidebar imageSize={imageSize} scale={scale} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MainPage;
