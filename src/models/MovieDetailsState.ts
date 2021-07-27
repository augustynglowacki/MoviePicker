import {Actor} from './Actor';

import {MovieDetails} from './MovieDetails';
import {TvShowsDetails} from './TvShowsDetails';

export interface MovieDetailsState {
  fetchedMovies: Record<number, MovieDetails>;
  fetchedTvShows: Record<number, TvShowsDetails>;
  loading: boolean;
  error: string;
  movieActors: Actor[];
}
