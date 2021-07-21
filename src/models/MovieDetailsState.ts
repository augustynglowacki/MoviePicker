import {Actor} from './Actor';

import {MovieDetails} from './MovieDetails';

export interface MovieDetailsState {
  movieDetails: MovieDetails;
  loading: boolean;
  error: string;
  movieActors: Actor[];
}
