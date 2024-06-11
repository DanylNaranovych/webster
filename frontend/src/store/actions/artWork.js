import ArtWorkService from '../../services/artWorkService';

export const createArtWork = (data, file) => async (dispatch) => {
    try {
        const response = await ArtWorkService.create(data);
        const id = response.data.id;
        dispatch(uploadArtWork(id, file));
        dispatch({ type: 'SET_MESSAGE', payload: 'Successfully saved.' });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Create failed', error);
    }
};

export const updateArtWork = (data, file, id) => async (dispatch) => {
    try {
        await ArtWorkService.update(data, id);
        dispatch(uploadArtWork(id, file));
        dispatch({ type: 'SET_MESSAGE', payload: 'Successfully saved.' });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Create failed', error);
    }
};

export const getArtWork = (id) => async (dispatch) => {
    try {
        const response = await ArtWorkService.get(id);
        dispatch({ type: 'SET_ARTWORK', payload: response.data });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Create failed', error);
    }
};

export const getArtWorks = () => async (dispatch) => {
    try {
        const response = await ArtWorkService.getAll();
        dispatch({ type: 'SET_ARTWORKS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Create failed', error);
    }
};

export const uploadArtWork = (id, file) => async (dispatch) => {
    try {
        await ArtWorkService.upload(id, file);
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Create failed', error);
    }
};

export const clearArtWork = () => async (dispatch) => {
    try {
        dispatch({ type: 'SET_ARTWORK', payload: null });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Create failed', error);
    }
};
