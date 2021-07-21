import {Actor} from './Actor';
import {MovieState} from './MovieState';

export interface SearchState {
  query: string;
  foundMovies: MovieState;
  foundTvShows: MovieState;
  foundActors: {actors: Actor[]; error: string};
}
