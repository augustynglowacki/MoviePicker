import {applyMiddleware} from '@reduxjs/toolkit';
import {createStore} from 'redux';
import moviesReducer from './movies/moviesReducer';
import createSagaMiddleware from 'redux-saga';
import rootSagas from './rootSagas';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  moviesReducer,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSagas);
