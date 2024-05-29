export const handleTransformEnd = (imageRef, lines, setLines, setImageSize) => {
    const node = imageRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    const newWidth = Math.max(20, node.width() * scaleX);
    const newHeight = Math.max(20, node.height() * scaleY);

    node.scaleX(1);
    node.scaleY(1);

    setImageSize({
        width: newWidth,
        height: newHeight,
    });

    const updatedLines = lines.map((line) => {
        const updatedPoints = line.points.map((point, index) => {
            if (index % 2 === 0) {
                return point * scaleX;
            } else {
                return point * scaleY;
            }
        });
        return {
            ...line,
            points: updatedPoints,
        };
    });
    setLines(updatedLines);
};
