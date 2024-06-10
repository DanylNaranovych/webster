export const serializeData = (
    imageSize,
    lines,
    texts,
    figures,
    effectsValues,
) => {
    const data = {
        imageSize: {
            width: imageSize.width,
            height: imageSize.height,
        },

        lines: lines.map((line) => ({
            points: line.points,
            color: line.color,
            size: line.size,
        })),

        texts: texts.map((textData) => ({
            id: textData.id,
            x: textData.x,
            y: textData.y,
            text: textData.text,
            fontSize: textData.fontSize,
            fontFamily: textData.fontFamily,
            color: textData.color,
        })),

        figures: figures.map((figure) => ({
            id: figure.key,
            x: figure.x,
            y: figure.y,
            tool: figure.tool,
            width: figure.width,
            height: figure.height,
            fill: figure.fill,
            color: figure.color,
            size: figure.size,
        })),

        effectsValues: {
            brightness: effectsValues.brightness,
            contrast: effectsValues.contrast,
            grayscale: effectsValues.grayscale,
            saturate: effectsValues.saturate,
            blur: effectsValues.blur,
        },
    };

    return JSON.stringify(data, null, 2);
};

export const deserializeData = (jsonString) => {
    const data = JSON.parse(jsonString);

    const imageSize = {
        width: data.imageSize.width,
        height: data.imageSize.height,
    };

    const lines = data.lines.map((line) => ({
        points: line.points,
        color: line.color,
        size: line.size,
    }));

    const texts = data.texts.map((textData) => ({
        id: textData.id,
        x: textData.x,
        y: textData.y,
        text: textData.text,
        fontSize: textData.fontSize,
        fontFamily: textData.fontFamily,
        color: textData.color,
    }));

    const figures = data.figures.map((figure) => ({
        key: figure.id,
        x: figure.x,
        y: figure.y,
        tool: figure.tool,
        width: figure.width,
        height: figure.height,
        fill: figure.fill,
        color: figure.color,
        size: figure.size,
    }));

    return {
        imageSize,
        lines,
        texts,
        figures,
    };
};
