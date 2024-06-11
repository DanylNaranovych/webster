import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Stage, Layer, Image, Transformer, Line } from 'react-konva';
import useImagePaste from './hooks/useImagePaste';
import useDeleteImage from './hooks/useDeleteImage';
import { handleTransformEnd } from '../../utils/transformUtils';
import EditableText from './EditableText';
import ImageControls from './ImageControls';
import AnnotationFigure from './AnnotationFigure';
import styles from '../../styles/PhotoEditor.module.css';
import Konva from 'konva';

const PhotoEditor = ({
    onImageSizeChange,
    onScaleChange,
    scale,
    drawColor,
    drawingSize,
    onSaveImage,
    onSaveLines,
    selectedTool,
    imageSrc,
    setImageSrc,
    artWork,
    image,
    setImage,
    texts,
    setTexts,
    annotations,
    setAnnotations,
    deleteAnnotation,
    selectedText,
    effectsValues,
    brushType,
    onFiguresChange,
    onTextsChange,
    lines,
    setLines,
}) => {
    const containerRef = useRef(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
    const [selectedImage, setSelectedImage] = useState(null);
    const transformerRef = useRef(null);
    const imageRef = useRef(null);
    const stageRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const [isDrawing, setIsDrawing] = useState(false);
    const [newAnnotation, setNewAnnotation] = useState([]);

    const filters = [];

    const handleDeleteImage = () => {
        setImageSrc(null);
        setImage(null);
        setSelectedImage(null);
        setLines([]);
        setImageSize({ width: 0, height: 0 });
        onScaleChange(1);
    };

    const handleClickOrTap = (image) => {
        if (selectedTool === 'select') {
            setSelectedImage(image);
        }
    };

    useImagePaste(setImageSrc);
    useDeleteImage(selectedImage, handleDeleteImage);

    const onDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
        },
        [setImageSrc],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png'],
        },
    });

    useEffect(() => {
        onImageSizeChange(imageSize);
    }, [imageSize, onImageSizeChange]);

    useEffect(() => {
        onSaveImage(image);
    }, [image, onSaveImage]);

    useEffect(() => {
        onScaleChange(scale);
    }, [scale, onScaleChange]);

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
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                setImage(img);
                setImageSize({ width: img.width, height: img.height });
                if (artWork) {
                    setImageSize({
                        width: artWork.content.imageSize.width,
                        height: artWork.content.imageSize.height,
                    });
                    setLines(artWork.content.lines);
                    setTexts(artWork.content.texts);
                    setAnnotations(artWork.content.figures);
                }
            };
        }
    }, [
        imageSrc,
        setImage,
        stageSize,
        artWork,
        setTexts,
        setLines,
        setAnnotations,
    ]);

    useEffect(() => {
        if (selectedImage && transformerRef.current) {
            transformerRef.current.nodes([imageRef.current]);
            transformerRef.current.getLayer().batchDraw();
        }
    }, [selectedImage]);

    useEffect(() => {
        if (effectsValues && image) {
            if (effectsValues.brightness !== 0) {
                filters.push(Konva.Filters.Brighten);
                imageRef.current.brightness(effectsValues.brightness);
            }
            if (effectsValues.contrast !== 0) {
                filters.push(Konva.Filters.Contrast);
                imageRef.current.contrast(effectsValues.contrast);
            }
            if (effectsValues.grayscale !== 0 || effectsValues.saturate !== 0) {
                filters.push(Konva.Filters.HSL);
                imageRef.current.saturation(
                    effectsValues.saturate - effectsValues.grayscale,
                );
            }
            if (effectsValues.blur !== 0) {
                filters.push(Konva.Filters.Blur);
                imageRef.current.blurRadius(effectsValues.blur);
            }

            imageRef.current.cache();
            imageRef.current.filters(filters);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [effectsValues]);

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
        if (selectedTool === 'draw' || selectedTool === 'erase') {
            setIsDrawing(true);
            const color = selectedTool === 'erase' ? 'white' : drawColor;
            const size = brushType === 'pencil' ? drawingSize / 2 : drawingSize;
            const stage = stageRef.current;
            const scale = stage.scaleX();
            const pointerPosition = stage.getPointerPosition();
            const stagePos = stage.position();
            const imageNode = imageRef.current;
            const imagePosition = imageNode.position();
            const x1 = imagePosition.x;
            const y1 = imagePosition.y;
            const x2 = x1 + imageNode.width();
            const y2 = y1 + imageNode.height();
            const x = (pointerPosition.x - stagePos.x) / scale;
            const y = (pointerPosition.y - stagePos.y) / scale;
            if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
                onSaveLines([...lines, { points: [x, y], color, size }]);
                // setLines([...lines, { points: [x, y], color, size }]);
            }
            return;
        }

        if (selectedTool === 'rect' || selectedTool === 'circle') {
            const stage = stageRef.current;
            const scale = stage.scaleX();
            const pointerPosition = stage.getPointerPosition();
            const stagePos = stage.position();
            const imageNode = imageRef.current;
            const imagePosition = imageNode.position();
            const x1 = imagePosition.x;
            const y1 = imagePosition.y;
            const x2 = x1 + imageNode.width();
            const y2 = y1 + imageNode.height();
            const x = (pointerPosition.x - stagePos.x) / scale;
            const y = (pointerPosition.y - stagePos.y) / scale;
            if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
                if (newAnnotation.length === 0) {
                    setNewAnnotation([
                        {
                            x,
                            y,
                            width: 0,
                            height: 0,
                            key: '0',
                            color: drawColor,
                            size: drawingSize,
                            tool: selectedTool,
                        },
                    ]);
                }
            }
        }

        if (selectedTool === 'text') {
            const id = texts.length + 1;
            const stage = stageRef.current;
            const scale = stage.scaleX();
            const pointerPosition = stage.getPointerPosition();
            const stagePos = stage.position();
            const imageNode = imageRef.current;
            const imagePosition = imageNode.position();
            const x1 = imagePosition.x;
            const y1 = imagePosition.y;
            const x2 = x1 + imageNode.width();
            const y2 = y1 + imageNode.height();
            const x = (pointerPosition.x - stagePos.x) / scale;
            const y = (pointerPosition.y - stagePos.y) / scale;
            if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
                const textProps = {
                    x: (pointerPosition.x - stage.x()) / scale,
                    y: (pointerPosition.y - stage.y()) / scale,
                    text: 'Введите текст',
                    color: drawColor,
                    fontSize: 48,
                    draggable: true,
                    id: `text-${id}`,
                };
                onTextsChange([...texts, textProps]);
            }
            return;
        }
        if (e.target === e.target.getStage()) {
            setSelectedImage(null);
        }
        if (selectedTool === 'select') {
            setIsDragging(true);
            const stage = stageRef.current;
            const pointer = stage.getPointerPosition();
            setDragStart({
                x: pointer.x - stage.x(),
                y: pointer.y - stage.y(),
            });
        }
    };

    const handleMouseMove = (e) => {
        if (
            isDrawing &&
            (selectedTool === 'draw' ||
                selectedTool === 'erase' ||
                brushType === 'pencil' ||
                brushType === 'brush' ||
                brushType === 'spray')
        ) {
            const stage = stageRef.current;
            const scale = stage.scaleX();
            const pointerPosition = stage.getPointerPosition();
            const stagePos = stage.position();
            const imageNode = imageRef.current;
            const imagePosition = imageNode.position();
            const x1 = imagePosition.x;
            const y1 = imagePosition.y;
            const x2 = x1 + imageNode.width();
            const y2 = y1 + imageNode.height();
            const x = (pointerPosition.x - stagePos.x) / scale;
            const y = (pointerPosition.y - stagePos.y) / scale;
            if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
                if (brushType === 'spray') {
                    const sprayRadius = 10;
                    const sprayDensity = 10;
                    const sprayPoints = [];

                    for (let i = 0; i < sprayDensity; i++) {
                        const angle = Math.random() * 2 * Math.PI;
                        const radius = Math.sqrt(Math.random()) * sprayRadius;
                        const xPoint = x + radius * Math.cos(angle);
                        const yPoint = y + radius * Math.sin(angle);
                        sprayPoints.push([xPoint, yPoint]);
                    }

                    const flattenedPoints = sprayPoints.reduce((acc, point) => {
                        acc.push(point[0], point[1]);
                        return acc;
                    }, []);

                    const newLine = {
                        points: flattenedPoints,
                        color: drawColor,
                        size: drawingSize,
                    };
                    // onSaveLines([...lines, newLine]);
                    setLines([...lines, newLine]);
                }

                if (brushType === 'brush') {
                    const lastLine = lines[lines.length - 1];
                    if (lastLine) {
                        const lastPoint = lastLine.points.slice(-2);
                        const distance = Math.hypot(
                            x - lastPoint[0],
                            y - lastPoint[1],
                        );
                        if (distance > 5) {
                            lastLine.points = lastLine.points.concat([x, y]);
                            // onSaveLines([
                            //     ...lines.slice(0, lines.length - 1),
                            //     lastLine,
                            // ]);
                            setLines([
                                ...lines.slice(0, lines.length - 1),
                                lastLine,
                            ]);
                        }
                    }
                }

                if (brushType === 'pencil' || selectedTool === 'erase') {
                    const lastLine = lines[lines.length - 1];
                    if (lastLine) {
                        const lastPoint = lastLine.points.slice(-2);
                        const distance = Math.hypot(
                            x - lastPoint[0],
                            y - lastPoint[1],
                        );
                        if (distance > 2) {
                            lastLine.points = lastLine.points.concat([x, y]);
                            // onSaveLines([
                            //     ...lines.slice(0, lines.length - 1),
                            //     lastLine,
                            // ]);
                            setLines([
                                ...lines.slice(0, lines.length - 1),
                                lastLine,
                            ]);
                        }
                    }
                }
            }
            return;
        }

        if (
            (selectedTool === 'rect' || selectedTool === 'circle') &&
            newAnnotation.length === 1
        ) {
            const sx = newAnnotation[0].x;
            const sy = newAnnotation[0].y;

            const stage = stageRef.current;
            const scale = stage.scaleX();
            const pointerPosition = stage.getPointerPosition();
            const stagePos = stage.position();
            const x = (pointerPosition.x - stagePos.x) / scale;
            const y = (pointerPosition.y - stagePos.y) / scale;
            setNewAnnotation([
                {
                    x: sx,
                    y: sy,
                    width: x - sx,
                    height: y - sy,
                    key: '0',
                    color: drawColor,
                    size: drawingSize,
                    tool: selectedTool,
                },
            ]);
        }
        if (!isDragging) return;
        if (selectedTool === 'select') {
            const stage = stageRef.current;
            const pointer = stage.getPointerPosition();
            const newPos = {
                x: pointer.x - dragStart.x,
                y: pointer.y - dragStart.y,
            };
            stage.position(newPos);
            stage.batchDraw();
        }
    };

    const handleMouseUp = (e) => {
        setIsDragging(false);
        setIsDrawing(false);
        if (
            (selectedTool === 'rect' || selectedTool === 'circle') &&
            newAnnotation.length === 1
        ) {
            const sx = newAnnotation[0].x;
            const sy = newAnnotation[0].y;
            const stage = stageRef.current;
            const scale = stage.scaleX();
            const pointerPosition = stage.getPointerPosition();
            const stagePos = stage.position();
            const x = (pointerPosition.x - stagePos.x) / scale;
            const y = (pointerPosition.y - stagePos.y) / scale;
            const annotationToAdd = {
                x: sx,
                y: sy,
                width: x - sx,
                height: y - sy,
                color: drawColor,
                key: annotations.length + 1,
                size: drawingSize,
                tool: selectedTool,
            };

            setAnnotations((prevAnnotations) => {
                const newAnnotations = [...prevAnnotations, annotationToAdd];
                onFiguresChange(newAnnotations);
                return newAnnotations;
            });
            setNewAnnotation([]);
        }
    };

    const handleTextChange = (newAttrs) => {
        const rects = texts.slice();
        const index = rects.findIndex((rect) => rect.id === newAttrs.id);
        rects[index] = newAttrs;
        onTextsChange(rects);
    };

    const annotationsToDraw = [...annotations, ...newAnnotation];

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
                <>
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
                                    onClick={() => handleClickOrTap(image)}
                                    onTap={() => handleClickOrTap(image)}
                                    onTransformEnd={() =>
                                        handleTransformEnd(
                                            image,
                                            imageRef,
                                            stageRef,
                                            lines,
                                            setLines,
                                            imageSize,
                                            setImageSize,
                                            setImage,
                                        )
                                    }
                                />
                            )}
                            {lines.map((line, i) => (
                                <Line
                                    key={i}
                                    points={line.points}
                                    stroke={line.color}
                                    strokeWidth={line.size}
                                />
                            ))}
                            {texts.map((text, i) => (
                                <EditableText
                                    key={i}
                                    textProps={text}
                                    isSelected={text.id === selectedText}
                                    onChange={handleTextChange}
                                />
                            ))}
                            {annotationsToDraw.map((value) => (
                                <AnnotationFigure
                                    key={value.id}
                                    value={value}
                                    selectedTool={selectedTool}
                                    brushType={brushType}
                                    color={drawColor}
                                    onDelete={deleteAnnotation}
                                />
                            ))}
                            {selectedImage && (
                                <Transformer ref={transformerRef} />
                            )}
                        </Layer>
                    </Stage>
                    <div className={styles.controlsOverlay}>
                        <ImageControls
                            imageSize={imageSize}
                            scale={scale}
                            onScaleChange={onScaleChange}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default PhotoEditor;
