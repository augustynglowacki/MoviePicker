import {Movie} from '../models';

export const GET_MOVIES_PENDING = 'GET_MOVIES_PENDING';
export const GET_MOVIES_SUCCES = 'GET_MOVIES_SUCCES';
export const GET_MOVIES_REJECTED = 'GET_MOVIES_REJECTED';

export interface GetMoviesPending {
  type: typeof GET_MOVIES_PENDING;
}
export interface GetMoviesSucces {
  type: typeof GET_MOVIES_SUCCES;
  payload: Movie[];
}
export interface GetMoviesRejected {
  type: typeof GET_MOVIES_REJECTED;
  payload: string;
}

export type MovieActionTypes =
  | GetMoviesPending
  | GetMoviesSucces
  | GetMoviesRejected;
