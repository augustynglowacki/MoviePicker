import {Movie} from '../../models';

export const GET_MOVIES_STARTED = 'GET_MOVIES_STARTED';
export const GET_MOVIES_PENDING = 'GET_MOVIES_PENDING';
export const GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS';
export const GET_MOVIES_REJECTED = 'GET_MOVIES_REJECTED';

export interface GetMoviesStarted {
  type: typeof GET_MOVIES_STARTED;
}
export interface GetMoviesPending {
  type: typeof GET_MOVIES_PENDING;
}
export interface GetMoviesSuccess {
  type: typeof GET_MOVIES_SUCCESS;
  payload: Movie[];
}
export interface GetMoviesRejected {
  type: typeof GET_MOVIES_REJECTED;
  payload: string;
}

export type MovieActionTypes =
  | GetMoviesStarted
  | GetMoviesPending
  | GetMoviesSuccess
  | GetMoviesRejected;
