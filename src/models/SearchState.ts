import {MovieState} from './MovieState';

export interface SearchState {
  query: string;
  foundMovies: MovieState;
  foundTvShows: MovieState;
}
