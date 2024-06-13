import Konva from 'konva';

export const handleDownload = (
    effectsValues,
    lines,
    texts,
    figures,
    imageSize,
    image,
) => {
    const tempContainer = document.createElement('div');
    document.body.appendChild(tempContainer);

    const tempStage = new Konva.Stage({
        container: tempContainer,
        width: imageSize.width,
        height: imageSize.height,
    });

    const tempLayer = new Konva.Layer();

    const tempImage = new Konva.Image({
        image: image,
        width: imageSize.width,
        height: imageSize.height,
    });

    tempImage.cache();
    const filters = [];

    if (effectsValues.brightness !== 0) {
        filters.push(Konva.Filters.Brighten);
        tempImage.brightness(effectsValues.brightness);
    }
    if (effectsValues.contrast !== 0) {
        filters.push(Konva.Filters.Contrast);
        tempImage.contrast(effectsValues.contrast);
    }
    if (effectsValues.grayscale !== 0 || effectsValues.saturate !== 0) {
        filters.push(Konva.Filters.HSL);
        tempImage.saturation(effectsValues.saturate - effectsValues.grayscale);
    }
    if (effectsValues.blur !== 0) {
        filters.push(Konva.Filters.Blur);
        tempImage.blurRadius(effectsValues.blur);
    }

    tempImage.filters(filters);

    tempLayer.add(tempImage);

    lines.forEach((line) => {
        const tempLine = new Konva.Line({
            points: line.points,
            stroke: line.color,
            strokeWidth: line.size,
        });
        tempLayer.add(tempLine);
    });

    texts.forEach((textData) => {
        const tempText = new Konva.Text({
            x: textData.x,
            y: textData.y,
            text: textData.text,
            fontSize: textData.fontSize,
            fontFamily: textData.fontFamily,
            fill: textData.color,
        });
        tempLayer.add(tempText);
    });

    figures.forEach((figure) => {
        if (figure.tool === 'rect') {
            const tempText = new Konva.Rect({
                x: figure.x,
                y: figure.y,
                width: figure.width,
                height: figure.height,
                tool: figure.tool,
                fill: figure.fill,
                stroke: figure.color,
                strokeWidth: figure.size,
            });
            tempLayer.add(tempText);
        } else if (figure.tool === 'circle') {
            const tempText = new Konva.Circle({
                x: figure.x,
                y: figure.y,
                width: figure.width,
                height: figure.height,
                tool: figure.tool,
                fill: figure.fill,
                stroke: figure.color,
                strokeWidth: figure.size,
            });
            tempLayer.add(tempText);
        }
    });
    tempStage.add(tempLayer);

    const uri = tempStage.toDataURL();

    const link = document.createElement('a');
    link.href = uri;
    link.download = 'edited_image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    tempLayer.destroy();
    tempContainer.remove();
};

export const CreateArtWorkPhoto = (
    effectsValues,
    lines,
    texts,
    figures,
    imageSize,
    image,
) => {
    const tempContainer = document.createElement('div');
    document.body.appendChild(tempContainer);

    const tempStage = new Konva.Stage({
        container: tempContainer,
        width: imageSize.width,
        height: imageSize.height,
    });

    const tempLayer = new Konva.Layer();

    const tempImage = new Konva.Image({
        image: image,
        width: imageSize.width,
        height: imageSize.height,
    });

    tempImage.cache();
    const filters = [];

    if (effectsValues.brightness !== 0) {
        filters.push(Konva.Filters.Brighten);
        tempImage.brightness(effectsValues.brightness);
    }
    if (effectsValues.contrast !== 0) {
        filters.push(Konva.Filters.Contrast);
        tempImage.contrast(effectsValues.contrast);
    }
    if (effectsValues.grayscale !== 0 || effectsValues.saturate !== 0) {
        filters.push(Konva.Filters.HSL);
        tempImage.saturation(effectsValues.saturate - effectsValues.grayscale);
    }
    if (effectsValues.blur !== 0) {
        filters.push(Konva.Filters.Blur);
        tempImage.blurRadius(effectsValues.blur);
    }

    tempImage.filters(filters);

    tempLayer.add(tempImage);

    lines.forEach((line) => {
        const tempLine = new Konva.Line({
            points: line.points,
            stroke: line.color,
            strokeWidth: line.size,
        });
        tempLayer.add(tempLine);
    });

    texts.forEach((textData) => {
        const tempText = new Konva.Text({
            x: textData.x,
            y: textData.y,
            text: textData.text,
            fontSize: textData.fontSize,
            fontFamily: textData.fontFamily,
            fill: textData.color,
        });
        tempLayer.add(tempText);
    });

    figures.forEach((figure) => {
        if (figure.tool === 'rect') {
            const tempText = new Konva.Rect({
                x: figure.x,
                y: figure.y,
                width: figure.width,
                height: figure.height,
                tool: figure.tool,
                fill: figure.fill,
                stroke: figure.color,
                strokeWidth: figure.size,
            });
            tempLayer.add(tempText);
        } else if (figure.tool === 'circle') {
            const tempText = new Konva.Circle({
                x: figure.x,
                y: figure.y,
                width: figure.width,
                height: figure.height,
                tool: figure.tool,
                fill: figure.fill,
                stroke: figure.color,
                strokeWidth: figure.size,
            });
            tempLayer.add(tempText);
        }
    });

    tempStage.add(tempLayer);

    const uri = tempStage.toDataURL();

    return uri;
};
