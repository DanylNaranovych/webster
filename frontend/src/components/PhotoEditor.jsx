import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Stage, Layer, Image as KonvaImage, Transformer } from 'react-konva';
import styles from '../styles/PhotoEditor.module.css';

const PhotoEditor = ({ onImageSizeChange, onScaleChange }) => {
    const [imageSrc, setImageSrc] = useState(null);
    const containerRef = useRef(null);
    const [image, setImage] = useState(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
    const [scale, setScale] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const transformerRef = useRef(null);
    const imageRef = useRef(null);
    const stageRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result);
        };
        reader.readAsDataURL(file);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png'],
        },
    });

    const handlePaste = (event) => {
        const items = event.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const file = items[i].getAsFile();
                const reader = new FileReader();
                reader.onload = () => {
                    setImageSrc(reader.result);
                };
                reader.readAsDataURL(file);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('paste', handlePaste);
        return () => {
            window.removeEventListener('paste', handlePaste);
        };
    }, []);

    useEffect(() => {
        onImageSizeChange(imageSize);
        onScaleChange(scale);
    }, [imageSize, scale, onImageSizeChange, onScaleChange]);

    useEffect(() => {
        if (containerRef.current) {
            const { clientWidth, clientHeight } = containerRef.current;
            setStageSize({
                width: clientWidth,
                height: clientHeight,
            });
        }
    }, []);

    useEffect(() => {
        if (imageSrc) {
            const img = new window.Image();
            img.src = imageSrc;
            img.onload = () => {
                setImage(img);
                setImageSize({ width: img.width, height: img.height });
                const initialScale = Math.min(
                    stageSize.width / img.width,
                    stageSize.height / img.height,
                );
                setScale(initialScale);
            };
        }
    }, [imageSrc, stageSize]);

    useEffect(() => {
        if (selectedImage && transformerRef.current) {
            transformerRef.current.nodes([imageRef.current]);
            transformerRef.current.getLayer().batchDraw();
        }
    }, [selectedImage]);

    const handleWheel = (e) => {
        e.evt.preventDefault();
        const stage = stageRef.current;
        const oldScale = stage.scaleX();

        const pointer = stage.getPointerPosition();

        const mousePointTo = {
            x: (pointer.x - stage.x()) / oldScale,
            y: (pointer.y - stage.y()) / oldScale,
        };

        const newScale = e.evt.deltaY > 0 ? oldScale * 0.9 : oldScale * 1.1;
        setScale(newScale);

        const newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
        };
        stage.position(newPos);
        stage.batchDraw();
    };

    const handleMouseDown = (e) => {
        if (e.target === e.target.getStage()) {
            setSelectedImage(null);
        }
        setIsDragging(true);
        const stage = stageRef.current;
        const pointer = stage.getPointerPosition();
        setDragStart({ x: pointer.x - stage.x(), y: pointer.y - stage.y() });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const stage = stageRef.current;
        const pointer = stage.getPointerPosition();
        const newPos = {
            x: pointer.x - dragStart.x,
            y: pointer.y - dragStart.y,
        };
        stage.position(newPos);
        stage.batchDraw();
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div ref={containerRef} className={styles.photoEditor}>
            {!imageSrc && (
                <div {...getRootProps()} className={styles.dropzone}>
                    <input {...getInputProps()} />
                    <label htmlFor="imageInput" className={styles.imageInput}>
                        {isDragActive
                            ? 'Drop the image here...'
                            : 'Choose or Drag & Drop Image'}
                    </label>
                </div>
            )}
            <div className={styles.stageContainer}>
                <Stage
                    width={stageSize.width}
                    height={stageSize.height}
                    ref={stageRef}
                    scaleX={scale}
                    scaleY={scale}
                    onWheel={handleWheel}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleMouseDown}
                    onTouchMove={handleMouseMove}
                    onTouchEnd={handleMouseUp}
                >
                    <Layer>
                        {image && (
                            <KonvaImage
                                image={image}
                                width={imageSize.width}
                                height={imageSize.height}
                                ref={imageRef}
                                onClick={() => setSelectedImage(image)}
                                onTap={() => setSelectedImage(image)}
                                onTransformEnd={(e) => {
                                    const node = imageRef.current;
                                    const scaleX = node.scaleX();
                                    const scaleY = node.scaleY();
                                    node.scaleX(1);
                                    node.scaleY(1);
                                    setImageSize({
                                        width: Math.max(
                                            20,
                                            node.width() * scaleX,
                                        ),
                                        height: Math.max(
                                            20,
                                            node.height() * scaleY,
                                        ),
                                    });
                                }}
                            />
                        )}
                        {selectedImage && (
                            <Transformer
                                ref={transformerRef}
                                boundBoxFunc={(oldBox, newBox) => {
                                    if (
                                        newBox.width < 20 ||
                                        newBox.height < 20
                                    ) {
                                        return oldBox;
                                    }
                                    return newBox;
                                }}
                            />
                        )}
                    </Layer>
                </Stage>
            </div>
        </div>
    );
};

export default PhotoEditor;
