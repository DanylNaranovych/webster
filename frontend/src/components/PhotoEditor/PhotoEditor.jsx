import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Stage, Layer, Image, Transformer, Line } from 'react-konva';
import useImagePaste from './hooks/useImagePaste';
import useDeleteImage from './hooks/useDeleteImage';
import { handleTransformEnd } from '../../utils/transformUtils';
import styles from '../../styles/PhotoEditor.module.css';

const PhotoEditor = ({
    onImageSizeChange,
    onScaleChange,
    scale,
    onSaveImage,
    selectedTool,
}) => {
    const [imageSrc, setImageSrc] = useState(null);
    const containerRef = useRef(null);
    const [image, setImage] = useState(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
    const [selectedImage, setSelectedImage] = useState(null);
    const transformerRef = useRef(null);
    const imageRef = useRef(null);
    const stageRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [lines, setLines] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);

    const handleDeleteImage = () => {
        setImageSrc(null);
        setImage(null);
        setSelectedImage(null);
        setImageSize({ width: 0, height: 0 });
        onScaleChange(1);
    };

    useImagePaste(setImageSrc);
    useDeleteImage(selectedImage, handleDeleteImage);

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

    useEffect(() => {
        onImageSizeChange(imageSize);
        onSaveImage(image);
        onScaleChange(scale);
    }, [
        imageSize,
        scale,
        image,
        onSaveImage,
        onImageSizeChange,
        onScaleChange,
    ]);

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
            };
        }
    }, [imageSrc, stageSize]);

    useEffect(() => {
        if (selectedImage && transformerRef.current) {
            console.log(transformerRef);
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

        let newScale = e.evt.deltaY > 0 ? oldScale * 0.9 : oldScale * 1.1;
        newScale = Math.max(0.125, Math.min(8, newScale));
        onScaleChange(newScale);

        const newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
        };
        stage.position(newPos);
        stage.batchDraw();
    };

    const handleMouseDown = (e) => {
        if (selectedTool === 'draw') {
            setIsDrawing(true);
            const stage = stageRef.current;
            const scale = stage.scaleX();
            const pointerPosition = stage.getPointerPosition();
            const x = (pointerPosition.x - stage.x()) / scale;
            const y = (pointerPosition.y - stage.y()) / scale;
            if (
                x >= 0 &&
                x <= imageSize.width &&
                y >= 0 &&
                y <= imageSize.height
            ) {
                setLines([...lines, { points: [x, y] }]);
            }
            return;
        }
        if (e.target === e.target.getStage()) {
            setSelectedImage(null);
        }
        setIsDragging(true);
        const stage = stageRef.current;
        const pointer = stage.getPointerPosition();
        setDragStart({ x: pointer.x - stage.x(), y: pointer.y - stage.y() });
    };

    const handleMouseMove = (e) => {
        if (isDrawing && selectedTool === 'draw') {
            const stage = stageRef.current;
            const scale = stage.scaleX();
            const pointerPosition = stage.getPointerPosition();
            const x = (pointerPosition.x - stage.x()) / scale;
            const y = (pointerPosition.y - stage.y()) / scale;
            if (
                x >= 0 &&
                x <= imageSize.width &&
                y >= 0 &&
                y <= imageSize.height
            ) {
                const lastLine = lines[lines.length - 1];
                const lastPoint = lastLine.points.slice(-2);
                const distance = Math.hypot(x - lastPoint[0], y - lastPoint[1]);
                if (distance > 2) {
                    lastLine.points = lastLine.points.concat([x, y]);
                    setLines([...lines.slice(0, lines.length - 1), lastLine]);
                }
            }
            return;
        }
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
        setIsDrawing(false);
    };

    return (
        <div ref={containerRef} className={styles.photoEditor}>
            {!imageSrc && (
                <div {...getRootProps()} className={styles.imageInput}>
                    {isDragActive
                        ? 'Drop the image here...'
                        : 'Choose or Drag & Drop Image'}
                    <input {...getInputProps()} />
                </div>
            )}
            {imageSrc && (
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
                            <Image
                                image={image}
                                width={imageSize.width}
                                height={imageSize.height}
                                ref={imageRef}
                                onClick={() => setSelectedImage(image)}
                                onTap={() => setSelectedImage(image)}
                                onTransformEnd={() =>
                                    handleTransformEnd(
                                        imageRef,
                                        lines,
                                        setLines,
                                        setImageSize,
                                    )
                                }
                            />
                        )}
                        {lines.map((line, i) => (
                            <Line
                                key={i}
                                points={line.points}
                                stroke="black"
                                strokeWidth={8}
                            />
                        ))}
                        {selectedImage && (
                            <Transformer
                                ref={transformerRef}
                                boundBoxFunc={(oldBox, newBox) => {
                                    const imageWidth =
                                        imageRef.current.width() * scale;
                                    const imageHeight =
                                        imageRef.current.height() * scale;
                                    const imageX = imageRef.current.x();
                                    const imageY = imageRef.current.y();
                                    if (
                                        newBox.x < 0 ||
                                        newBox.y < 0 ||
                                        newBox.x + newBox.width >
                                            stageSize.width ||
                                        newBox.y + newBox.height >
                                            stageSize.height
                                    ) {
                                        return oldBox;
                                    }
                                    const deltaX = newBox.x - oldBox.x;
                                    const deltaY = newBox.y - oldBox.y;
                                    if (
                                        (deltaX !== 0 && deltaY !== 0) ||
                                        (deltaX < 0 && imageX + deltaX < 0) ||
                                        (deltaY < 0 && imageY + deltaY < 0) ||
                                        (deltaX > 0 &&
                                            imageX + imageWidth + deltaX >
                                                stageSize.width) ||
                                        (deltaY > 0 &&
                                            imageY + imageHeight + deltaY >
                                                stageSize.height)
                                    ) {
                                        return oldBox;
                                    }

                                    return newBox;
                                }}
                            />
                        )}
                    </Layer>
                </Stage>
            )}
        </div>
    );
};

export default PhotoEditor;
