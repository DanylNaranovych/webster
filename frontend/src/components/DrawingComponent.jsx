import React from 'react';
import { Stage, Layer, Line, Text, Rect, Circle } from 'react-konva';

const DrawingComponent = ({ data }) => {
    const scaleX = 300 / data.imageSize.width;
    const scaleY = 300 / data.imageSize.height;

    return (
        <Stage width={300} height={300}>
            <Layer>
                {data.lines &&
                    data.lines.map((line, lineIndex) => (
                        <Line
                            key={lineIndex}
                            points={line.points.map((point, index) =>
                                index % 2 === 0
                                    ? point * scaleX
                                    : point * scaleY,
                            )}
                            stroke={line.color}
                            strokeWidth={line.size}
                        />
                    ))}
                {data.texts &&
                    data.texts.map((text, textIndex) => (
                        <Text
                            key={textIndex}
                            x={text.x * scaleX}
                            y={text.y * scaleY}
                            text={text.text}
                            fontSize={text.fontSize}
                            fontFamily={text.fontFamily}
                            fill={text.color}
                        />
                    ))}
                {data.figures &&
                    data.figures.map((figure, figureIndex) => {
                        if (figure.tool === 'rectangle') {
                            return (
                                <Rect
                                    key={figureIndex}
                                    x={figure.x * scaleX}
                                    y={figure.y * scaleY}
                                    width={figure.width}
                                    height={figure.height}
                                    fill={figure.fill}
                                    stroke={figure.color}
                                    strokeWidth={figure.size}
                                />
                            );
                        } else if (figure.tool === 'circle') {
                            return (
                                <Circle
                                    key={figureIndex}
                                    x={figure.x * scaleX}
                                    y={figure.y * scaleY}
                                    radius={figure.width / 2}
                                    fill={figure.fill}
                                    stroke={figure.color}
                                    strokeWidth={figure.size}
                                />
                            );
                        } else {
                            return null;
                        }
                    })}
            </Layer>
        </Stage>
    );
};

export default DrawingComponent;
