import {MovieDetails} from './MovieDetails';

export interface MovieDetailsState {
  movieDetails: MovieDetails;
  loading: boolean;
  error: string;
  requestedId: number;
}
