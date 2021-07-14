import {createStore} from 'redux';
import moviesReducer from './moviesReducer';

export const store = createStore(moviesReducer);
