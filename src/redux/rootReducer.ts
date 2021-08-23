import {combineReducers} from 'redux';
import moviesReducer from './movies/moviesReducer';

const rootReducer = combineReducers({
  moviesReducer,
});

export default rootReducer;
