import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Header from './Header';
import Sidebar from './Sidebar';
import PhotoEditor from './PhotoEditor';

const MainPage = () => {
    const [imageSettings, setImageSettings] = useState({
        brightness: 100,
        contrast: 100,
        saturation: 100,
    });

    const handleEdit = (action, value) => {
        switch (action) {
            case 'brightness':
                setImageSettings((prevSettings) => ({
                    ...prevSettings,
                    brightness: value,
                }));
                break;
            case 'contrast':
                setImageSettings((prevSettings) => ({
                    ...prevSettings,
                    contrast: value,
                }));
                break;
            case 'saturation':
                setImageSettings((prevSettings) => ({
                    ...prevSettings,
                    saturation: value,
                }));
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <Header />
            <Container fluid>
                <Row>
                    <Col xs={10}>
                        <PhotoEditor
                            onEdit={handleEdit}
                            imageSettings={imageSettings}
                        />
                    </Col>
                    <Col xs={2} style={{ borderLeft: '1px solid #ccc' }}>
                        <Sidebar onEdit={handleEdit} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MainPage;
