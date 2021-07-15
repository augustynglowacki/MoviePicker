import {applyMiddleware} from '@reduxjs/toolkit';
import {createStore} from 'redux';
import moviesReducer from './moviesReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  moviesReducer,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);
