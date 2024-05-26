import React, { useState, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { fabric } from 'fabric';

import styles from '../styles/PhotoEditor.module.css';

const PhotoEditor = ({ imageSettings }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const canvasRef = useRef(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const imgData = e.target.result;
            fabric.Image.fromURL(imgData, (img) => {
                const canvas = new fabric.Canvas(canvasRef.current);
                canvas.clear();
                img.set({
                    scaleX: canvas.width / img.width,
                    scaleY: canvas.height / img.height,
                });
                canvas.add(img);
                canvas.renderAll();
            });
        };
        setImageLoaded(true);
        console.log(file);
        reader.readAsDataURL(file);
    };

    // const applyFilters = () => {
    //     if (!canvas) return;
    //     const { brightness, contrast, saturation } = imageSettings;
    //     const filters = [];
    //     filters.push(new fabric.Image.filters.Brightness({ brightness }));
    //     filters.push(new fabric.Image.filters.Contrast({ contrast }));
    //     filters.push(new fabric.Image.filters.Saturation({ saturation }));
    //     canvas.getActiveObjects().forEach((obj) => {
    //         obj.filters = filters;
    //         obj.applyFilters();
    //     });
    //     canvas.renderAll();
    // };

    return (
        <div className={styles.photoEditorContainer}>
            <Container className="d-flex justify-content-center align-items-center h-100">
                {imageLoaded ? null : (
                    <label htmlFor="imageInput" className={styles.imageInput}>
                        Choose Image
                        <input
                            id="imageInput"
                            type="file"
                            accept="image/*"
                            className="d-none"
                            onChange={handleImageUpload}
                        />
                    </label>
                )}
                {imageLoaded && <canvas ref={canvasRef} />}
            </Container>
        </div>
    );
};

export default PhotoEditor;
