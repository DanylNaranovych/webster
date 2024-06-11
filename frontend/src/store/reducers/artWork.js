const initialState = {
    data: [],
    message: '',
};

const artWorkReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ARTWORK':
            return { ...state, data: action.payload };
        case 'SET_MESSAGE':
            return { ...state, message: action.payload };
        default:
            return state;
    }
};

export default artWorkReducer;
