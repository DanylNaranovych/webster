import { useCallback, useEffect } from 'react';

const useImagePaste = (setImageSrc) => {
    const handlePaste = useCallback(
        (event) => {
            const items = event.clipboardData.items;
            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf('image') !== -1) {
                    const file = items[i].getAsFile();
                    const reader = new FileReader();
                    reader.onload = () => {
                        setImageSrc(reader.result);
                    };
                    reader.readAsDataURL(file);
                }
            }
        },
        [setImageSrc],
    );

    useEffect(() => {
        window.addEventListener('paste', handlePaste);
        return () => {
            window.removeEventListener('paste', handlePaste);
        };
    }, [handlePaste]);

    return null;
};

export default useImagePaste;
