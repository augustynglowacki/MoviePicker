import {Movie} from '../models';
import {
  GET_MOVIES_REJECTED,
  GET_MOVIES_PENDING,
  GET_MOVIES_SUCCES,
  GetMoviesPending,
  GetMoviesSucces,
  GetMoviesRejected,
} from './moviesType';

export const getMoviePending = (): GetMoviesPending => {
  console.log('getMoviePending');
  return {
    type: GET_MOVIES_PENDING,
  };
};

export const getMoviesSucces = (results: Movie[]): GetMoviesSucces => {
  console.log('getMoviesSucces');
  return {
    type: GET_MOVIES_SUCCES,
    payload: results,
  };
};

export const getMoviesRejected = (error: string): GetMoviesRejected => {
  return {
    type: GET_MOVIES_REJECTED,
    payload: error,
  };
};
