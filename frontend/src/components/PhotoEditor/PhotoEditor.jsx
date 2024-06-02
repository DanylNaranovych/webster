import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Stage, Layer, Image, Transformer, Line } from 'react-konva';
import useImagePaste from './hooks/useImagePaste';
import useDeleteImage from './hooks/useDeleteImage';
import { handleTransformEnd } from '../../utils/transformUtils';
import EditableText from '../EditableText';
import ImageControls from './ImageControls';
import styles from '../../styles/PhotoEditor.module.css';

const PhotoEditor = ({
    onImageSizeChange,
    onScaleChange,
    scale,
    drawColor,
    drawingSize,
    onSaveImage,
    onSaveLines,
    selectedTool,
    texts,
    setTexts,
    selectedText,
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
        onSaveLines(lines);
    }, [
        imageSize,
        scale,
        image,
        onSaveImage,
        onImageSizeChange,
        onScaleChange,
        onSaveLines,
        lines,
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
        if (selectedTool === 'draw' || selectedTool === 'erase') {
            setIsDrawing(true);
            const color = selectedTool === 'erase' ? 'white' : drawColor;
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
                setLines([...lines, { points: [x, y], color, drawingSize }]);
            }
            return;
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
                setTexts([...texts, textProps]);
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
            (selectedTool === 'draw' || selectedTool === 'erase')
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
                const lastLine = lines[lines.length - 1];
                if (lastLine) {
                    const lastPoint = lastLine.points.slice(-2);
                    const distance = Math.hypot(
                        x - lastPoint[0],
                        y - lastPoint[1],
                    );
                    if (distance > 2) {
                        lastLine.points = lastLine.points.concat([x, y]);
                        setLines([
                            ...lines.slice(0, lines.length - 1),
                            lastLine,
                        ]);
                    }
                }
            }
            return;
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

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsDrawing(false);
    };

    const handleTextChange = (newAttrs) => {
        const rects = texts.slice();
        const index = rects.findIndex((rect) => rect.id === newAttrs.id);
        rects[index] = newAttrs;
        console.log(rects);
        setTexts(rects);
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
                                    strokeWidth={line.drawingSize}
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
