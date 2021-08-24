import {API_KEY} from '@env';
import {call, put, takeLatest} from 'redux-saga/effects';
import axiosInstance from '../../helpers/axiosInstance';
import {Movie, MovieAxiosResponse} from '../../models';
import * as moviesTypes from './moviesTypes';
import * as actionsTypes from './moviesActions';

const fetchMovies = async () => {
  const results = await axiosInstance.get<MovieAxiosResponse>(
    `movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
  );
  const newResults: Movie[] = results.data.results.map((result: Movie) => ({
    id: result.id,
    title: result.title,
    vote_average: result.vote_average,
    poster_path: result.poster_path,
    overview: result.overview,
  }));
  return newResults;
};

function* getMovies() {
  try {
    yield put(actionsTypes.getMoviePending());
    const result: Movie[] = yield call(fetchMovies);
    yield put(actionsTypes.getMoviesSuccess(result));
  } catch (error) {
    yield put(actionsTypes.getMoviesRejected(error));
  }
}

function* watchGetMoviesRequest() {
  yield takeLatest(moviesTypes.GET_MOVIES_STARTED, getMovies);
}

const movieSagas = watchGetMoviesRequest;

export default movieSagas;
