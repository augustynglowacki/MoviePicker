import {all} from 'redux-saga/effects';
import movieSagas from './movies/moviesSaga';

export default function* rootSaga() {
  console.log(rootSaga);
  yield all(movieSagas);
}
