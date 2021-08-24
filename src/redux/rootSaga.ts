import {all, fork} from 'redux-saga/effects';
import movieSagas from './movies/moviesSaga';

export default function* rootSaga() {
  yield all([fork(movieSagas)]);
}
