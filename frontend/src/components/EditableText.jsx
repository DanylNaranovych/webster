import React, { useRef, useEffect, useState } from 'react';
import { Text, Transformer } from 'react-konva';

const EditableText = ({ textProps, isSelected, onChange }) => {
    console.log(textProps);
    const shapeRef = useRef();
    const trRef = useRef();
    const [text, setText] = useState(textProps.text);
    const [color] = useState(textProps.color);

    useEffect(() => {
        if (isSelected) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <>
            <Text
                ref={shapeRef}
                {...textProps}
                text={text}
                fill={color}
                draggable={isSelected}
                onDragEnd={(e) => {
                    if (trRef.current) {
                        onChange({
                            ...textProps,
                            x: e.target.x(),
                            y: e.target.y(),
                        });
                    }
                }}
                onTransformEnd={() => {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    node.scaleX(1);
                    node.scaleY(1);
                    setText(node.text());

                    onChange({
                        ...textProps,
                        x: node.x(),
                        y: node.y(),
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(node.height() * scaleY),
                    });
                }}
                onDblClick={() => {
                    shapeRef.current.hide();
                    const textPosition = shapeRef.current.absolutePosition();
                    const areaPosition = {
                        x: textPosition.x,
                        y: textPosition.y,
                    };

                    const textarea = document.createElement('textarea');
                    document.body.appendChild(textarea);

                    textarea.value = text;
                    textarea.style.position = 'absolute';
                    textarea.style.top = `${areaPosition.y}px`;
                    textarea.style.left = `${areaPosition.x}px`;
                    textarea.style.width = `${shapeRef.current.width()}px`;

                    textarea.focus();

                    textarea.addEventListener('keydown', function (e) {
                        if (e.keyCode === 13) {
                            shapeRef.current.text(textarea.value);
                            setText(textarea.value);
                            onChange({ ...textProps, text: textarea.value });
                            document.body.removeChild(textarea);
                            shapeRef.current.show();
                            trRef.current && trRef.current.show();
                        }
                    });
                }}
            />
            {isSelected && <Transformer ref={trRef} />}
        </>
    );
};

export default EditableText;
