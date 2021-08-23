import {Movie} from '../../models';
import {
  GET_MOVIES_REJECTED,
  GET_MOVIES_PENDING,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_STARTED,
  GetMoviesPending,
  GetMoviesSuccess,
  GetMoviesRejected,
  GetMoviesStarted,
} from './moviesType';

export const getMoviesStarted = (): GetMoviesStarted => {
  return {
    type: GET_MOVIES_STARTED,
  };
};

export const getMoviePending = (): GetMoviesPending => {
  return {
    type: GET_MOVIES_PENDING,
  };
};

export const getMoviesSuccess = (results: Movie[]): GetMoviesSuccess => {
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
