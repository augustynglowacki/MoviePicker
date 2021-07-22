import {Actor} from './Actor';

import {MovieDetails} from './MovieDetails';

export interface MovieDetailsState {
  fetchedMovies: Record<number, MovieDetails>;
  loading: boolean;
  error: string;
  movieActors: Actor[];
}
