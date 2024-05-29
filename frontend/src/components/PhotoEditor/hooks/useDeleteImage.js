import { useEffect } from 'react';

const useDeleteImage = (selectedImage, handleDeleteImage) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Delete' && selectedImage) {
                handleDeleteImage();
            }
        };

        if (selectedImage) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            if (selectedImage) {
                window.removeEventListener('keydown', handleKeyDown);
            }
        };
    }, [selectedImage, handleDeleteImage]);
};

export default useDeleteImage;
