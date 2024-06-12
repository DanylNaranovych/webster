const initialState = {
    artWork: [],
    liblaryArtWorks: [],
    message: '',
};

const artWorkReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ARTWORK':
            return { ...state, artWork: action.payload };
        case 'SET_ARTWORKS':
            return { ...state, liblaryArtWorks: action.payload };
        case 'SET_MESSAGE':
            return { ...state, message: action.payload };
        case 'REMOVE_ARTWORK':
            return {
                ...state,
                liblaryArtWorks: state.liblaryArtWorks.filter(
                    (artwork) => artwork.id !== action.payload,
                ),
            };
        default:
            return state;
    }
};

export default artWorkReducer;
