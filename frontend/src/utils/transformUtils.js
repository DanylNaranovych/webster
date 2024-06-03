export const handleTransformEnd = (
    image,
    imageRef,
    stageRef,
    lines,
    setLines,
    imageSize,
    setImageSize,
    setImage,
) => {
    const node = imageRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    node.scaleX(1);
    node.scaleY(1);

    const newWidth = Math.max(20, node.width() * scaleX);
    const newHeight = Math.max(20, node.height() * scaleY);
    setImageSize({ width: newWidth, height: newHeight });

    const scaledLines = lines.map((line) => ({
        ...line,
        points: line.points.map((point, index) =>
            index % 2 === 0 ? point * scaleX : point * scaleY,
        ),
        strokeWidth: line.strokeWidth * Math.max(scaleX, scaleY),
    }));
    setLines(scaledLines);

    const layer = new window.Konva.Layer();
    const tempImage = new window.Konva.Image({
        image: image,
        width: imageSize.width,
        height: imageSize.height,
    });

    layer.add(tempImage);

    lines.forEach((line) => {
        const tempLine = new window.Konva.Line({
            points: line.points,
            stroke: line.color,
            strokeWidth: line.size,
            draggable: false,
        });
        layer.add(tempLine);
    });

    const canvas = layer.toCanvas();
    const newImage = new window.Image();
    newImage.src = canvas.toDataURL();

    newImage.onload = () => {
        setImage(newImage);
    };
};
