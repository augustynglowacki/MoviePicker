import {applyMiddleware} from '@reduxjs/toolkit';
import {createStore} from 'redux';
import moviesReducer from './moviesReducer';
import thunk from 'redux-thunk';

export const store = createStore(moviesReducer, applyMiddleware(thunk));
