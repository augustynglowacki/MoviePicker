import {Movie} from '../../models';
import * as moviesTypes from './moviesTypes';

export const getMoviesStarted = (): moviesTypes.GetMoviesStarted => {
  return {
    type: moviesTypes.GET_MOVIES_STARTED,
  };
};

export const getMoviePending = (): moviesTypes.GetMoviesPending => {
  return {
    type: moviesTypes.GET_MOVIES_PENDING,
  };
};

export const getMoviesSuccess = (
  results: Movie[],
): moviesTypes.GetMoviesSuccess => {
  return {
    type: moviesTypes.GET_MOVIES_SUCCESS,
    payload: results,
  };
};

export const getMoviesRejected = (
  error: string,
): moviesTypes.GetMoviesRejected => {
  return {
    type: moviesTypes.GET_MOVIES_REJECTED,
    payload: error,
  };
};
