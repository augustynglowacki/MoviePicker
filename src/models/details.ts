import {Genres} from './genres';
import {Movie, MovieApi} from './movie';

interface BaseDetails extends Movie {
  voteAverage: number;
  overview: string;
  title: string;
  genres: Genres[];
}

export interface MovieDetails extends BaseDetails {
  runtime?: number;
  releaseDate?: string;
}

export interface TvSeriesDetails extends BaseDetails {
  episodesCount?: number;
  seasonsCount?: number;
}

interface BaseDetailsApi extends MovieApi {
  vote_average: number;
  overview: string;
  genres: Genres[];
}

export interface MovieDetailsApi extends BaseDetailsApi {
  title: string;
  runtime?: number;
  release_date?: string;
}
export interface TvSeriesDetailsApi extends BaseDetailsApi {
  name: string;
  number_of_episodes?: number;
  number_of_seasons?: number;
}
