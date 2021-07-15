import {API_KEY} from '@env';
import {takeEvery, call, put, fork} from 'redux-saga/effects';
import axiosInstance from '../../helpers/axiosInstance';
import {Movie, MovieAxiosResponse} from '../../models';
import {getMoviesRejected, getMoviesSucces} from '../moviesAction';
import {GET_MOVIES_PENDING} from '../moviesType';
//workerSaga
function* getMovies() {
  console.log('getMovies');
  try {
    const result: Movie[] = yield call(fetchMovies);
    yield put(getMoviesSucces(result));
  } catch (error) {
    yield put(getMoviesRejected(error));
  }
}
//watcher Saga
function* watchGetMoviesRequest() {
  console.log('watchGetMoviesRequest');
  yield takeEvery(GET_MOVIES_PENDING, getMovies);
}

const movieSagas = [fork(watchGetMoviesRequest)];

export default movieSagas;

const fetchMovies = async () => {
  const results = await axiosInstance.get<MovieAxiosResponse>(
    `movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
  );
  const newresult: Movie[] = results.data.results.map((result: Movie) => ({
    id: result.id,
    title: result.title,
    vote_average: result.vote_average,
    poster_path: result.poster_path,
    overview: result.overview,
  }));
  return newresult;
};
