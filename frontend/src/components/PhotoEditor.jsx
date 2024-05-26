import React, { useState, useRef, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { fabric } from 'fabric';

import styles from '../styles/PhotoEditor.module.css';

const PhotoEditor = ({ imageSettings }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        // Функция, которая будет вызываться после каждого рендера
        // Проверяем, есть ли ссылка на контейнер, и если есть, выводим его размеры
        if (containerRef.current) {
            console.log(
                containerRef.current.offsetWidth,
                containerRef.current.offsetHeight,
            );
        }
    });

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const imgData = e.target.result;
            fabric.Image.fromURL(imgData, (img) => {
                const canvas = new fabric.Canvas(canvasRef.current);
                canvas.setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight,
                });

                canvas.clear();
                const scaleFactor = Math.min(
                    canvas.width / img.width,
                    canvas.height / img.height,
                );
                img.set({
                    scaleX: scaleFactor,
                    scaleY: scaleFactor,
                });
                img.set({
                    maxWidth: canvas.width,
                    maxHeight: canvas.height,
                });
                img.set({
                    top: (canvas.height - img.height * scaleFactor) / 2,
                    left: (canvas.width - img.width * scaleFactor) / 2,
                    selectable: false, // Предотвращаем выбор изображения, чтобы пользователь не мог его передвигать
                });
                canvas.add(img);
                canvas.renderAll();
            });
        };
        setImageLoaded(true);
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
        <Container
            ref={containerRef}
            className={`d-flex justify-content-center align-items-center ${styles.canvasContainer}`}
        >
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
            {imageLoaded && <canvas ref={canvasRef}></canvas>}
        </Container>
    );
};

export default PhotoEditor;
