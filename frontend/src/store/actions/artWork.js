import ArtWorkService from '../../services/artWorkService';

export const createArtWork =
    (data, mainImageFile, projectImageFile) => async (dispatch) => {
        try {
            const response = await ArtWorkService.create(data);
            const id = response.data.id;
            dispatch(uploadArtWork(id, mainImageFile));
            dispatch(uploadArtWorkPhoto(id, projectImageFile));
            dispatch({
                type: 'SET_MESSAGE',
                payload:
                    'Your ArtWork successfully saved. You can find it in your library.',
            });
        } catch (error) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: error.response.data.message,
            });
            console.error('Creating ArtWork failed', error);
        }
    };

export const updateArtWork =
    (data, mainImageFile, projectImageFile, id) => async (dispatch) => {
        try {
            await ArtWorkService.update(data, id);
            console.log(mainImageFile);
            console.log(projectImageFile);
            dispatch(uploadArtWork(id, mainImageFile));
            dispatch(uploadArtWorkPhoto(id, projectImageFile));
            dispatch({
                type: 'SET_MESSAGE',
                payload: 'Your ArtWork successfully saved.',
            });
        } catch (error) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: error.response.data.message,
            });
            console.error('Updating ArtWork failed', error);
        }
    };

export const getArtWork = (id) => async (dispatch) => {
    try {
        const response = await ArtWorkService.get(id);
        dispatch({ type: 'SET_ARTWORK', payload: response.data });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Getting Artwork failed', error);
    }
};

export const getArtWorks = () => async (dispatch) => {
    try {
        const response = await ArtWorkService.getAll();
        dispatch({
            type: 'SET_ARTWORKS',
            payload: response.data.artworksArray,
        });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Getting Artwork Error', error);
    }
};

export const uploadArtWork = (id, file) => async (dispatch) => {
    try {
        await ArtWorkService.upload(id, file);
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Upload failed', error);
    }
};

export const uploadArtWorkPhoto = (id, file) => async (dispatch) => {
    try {
        await ArtWorkService.uploadPhoto(id, file);
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Upload photo failed', error);
    }
};

export const deleteArtWork = (id) => async (dispatch) => {
    try {
        await ArtWorkService.delete(id);
        dispatch({ type: 'REMOVE_ARTWORK', payload: id });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Getting Artwork failed', error);
    }
};

export const clearArtWork = () => async (dispatch) => {
    try {
        dispatch({ type: 'SET_ARTWORK', payload: null });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Clear Artwork Error', error);
    }
};
