import { combineReducers } from 'redux';
import authReducer from './auth';
import artWorkReducer from './artWork';

const rootReducer = combineReducers({
    auth: authReducer,
    artWork: artWorkReducer,
});

export default rootReducer;
