import {MovieState} from './MovieState';

export interface SearchState {
  query: string;
  movies: MovieState;
  tvShows: MovieState;
}
