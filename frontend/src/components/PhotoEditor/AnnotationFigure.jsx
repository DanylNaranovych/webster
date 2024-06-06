import React, { useState, useRef, useEffect } from 'react';
import { Rect, Circle, Transformer } from 'react-konva';

const AnnotationFigure = ({ value, selectedTool, brushType, color }) => {
    const shapeRef = useRef();
    const transformerRef = useRef();
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        const handleClickOutside = () => {
            if (shapeRef.current && shapeRef.current.getStage()) {
                const stage = shapeRef.current.getStage();
                const pointerPos = stage.getPointerPosition();

                if (pointerPos) {
                    const { x, y } = pointerPos;
                    const rect = shapeRef.current.getClientRect();

                    if (
                        !(
                            x >= rect.x &&
                            x <= rect.x + rect.width &&
                            y >= rect.y &&
                            y <= rect.y + rect.height
                        )
                    ) {
                        setIsSelected(false);
                    }
                } else {
                    setIsSelected(false);
                }
            }
        };

        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isSelected) {
            transformerRef.current.nodes([shapeRef.current]);
            transformerRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    const handleSelect = (event) => {
        if (selectedTool === 'select') {
            event.cancelBubble = true;
            setIsSelected(true);
        }
        if (brushType === 'fill') {
            value.fill = color;
        }
    };

    const handleTransform = () => {
        const node = shapeRef.current;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        const width = Math.max(5, node.width() * scaleX);
        const height = Math.max(5, node.height() * scaleY);
        const x = node.x() + (node.width() * scaleX - width) / 2;
        const y = node.y() + (node.height() * scaleY - height) / 2;
        value.x = x;
        value.y = y;
        value.width = width;
        value.height = height;
        node.scaleX(1);
        node.scaleY(1);
    };

    const renderShape = () => {
        if (value.tool === 'rect') {
            return (
                <Rect
                    x={value.x}
                    y={value.y}
                    width={value.width}
                    height={value.height}
                    fill={value.fill}
                    stroke={value.color}
                    strokeWidth={value.size}
                    ref={shapeRef}
                    onClick={handleSelect}
                    draggable={isSelected}
                    onDragEnd={handleTransform}
                    onTransformEnd={handleTransform}
                />
            );
        } else if (value.tool === 'circle') {
            const radius = Math.max(value.width / 2, 5);
            return (
                <Circle
                    x={value.x}
                    y={value.y}
                    radius={radius}
                    fill={value.fill}
                    stroke={value.color}
                    strokeWidth={value.size}
                    ref={shapeRef}
                    onClick={handleSelect}
                    draggable={isSelected}
                    onDragEnd={handleTransform}
                    onTransformEnd={handleTransform}
                />
            );
        }
        return null;
    };

    return (
        <>
            {renderShape()}
            {isSelected && (
                <Transformer
                    ref={transformerRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        if (newBox.width < 10 || newBox.height < 10) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </>
    );
};

export default AnnotationFigure;
