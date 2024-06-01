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
            strokeWidth: line.drawingSize,
            draggable: false,
        });
        layer.add(tempLine);
    });

    const canvas = layer.toCanvas();
    const newImage = new window.Image();
    newImage.src = canvas.toDataURL();

    newImage.onload = () => {
        setImage(newImage);
        setImageSize({
            width: Math.max(20, node.width() * scaleX),
            height: Math.max(20, node.height() * scaleY),
        });
        setLines([]);
    };
};
