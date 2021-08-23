import {Movie} from '../../models';
import {
  GET_MOVIES_REJECTED,
  GET_MOVIES_PENDING,
  GET_MOVIES_SUCCESS,
  GetMoviesPending,
  GetMoviesSuccess,
  GetMoviesRejected,
} from './moviesType';

export const getMoviePending = (): GetMoviesPending => {
  console.log('getMoviePending');
  return {
    type: GET_MOVIES_PENDING,
  };
};

export const getMoviesSuccess = (results: Movie[]): GetMoviesSuccess => {
  console.log('getMoviesSuccess');
  return {
    type: GET_MOVIES_SUCCESS,
    payload: results,
  };
};

export const getMoviesRejected = (error: string): GetMoviesRejected => {
  return {
    type: GET_MOVIES_REJECTED,
    payload: error,
  };
};
