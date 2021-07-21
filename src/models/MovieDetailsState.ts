import {MovieActors} from './MovieActors';
import {MovieDetails} from './MovieDetails';

export interface MovieDetailsState {
  movieDetails: MovieDetails;
  loading: boolean;
  error: string;
  movieActors?: MovieActors[];
}
