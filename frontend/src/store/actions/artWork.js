import ArtWorkService from '../../services/artWorkService';

export const createArtWork = (data) => async (dispatch) => {
    try {
        await ArtWorkService.create(data);
        dispatch({ type: 'SET_MESSAGE', payload: 'Success create project' });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Create failed', error);
    }
};

export const getArtWork = (id) => async (dispatch) => {
    try {
        const response = await ArtWorkService.get(id);
        console.log(response);
        // dispatch({ type: 'SET_ARTWORK' });
    } catch (error) {
        dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
        console.error('Create failed', error);
    }
};
