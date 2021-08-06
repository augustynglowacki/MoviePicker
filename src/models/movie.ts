import {ContentType} from './contentType';
import {Genres} from './genres';

export interface MovieBase {
  voteAverage: number;
  posterPath: string;
  id: number;
  overview: string;
  contentType: ContentType;
  title: string;
}
export interface Movie extends MovieBase {
  genres: string[];
}
export interface MovieDetails extends MovieBase {
  runtime?: number;
  releaseDate?: string;
  genres: Genres[];
}
export interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string;
}
interface BaseApi {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  overview: string;
}
export interface MovieApi extends BaseApi {
  genre_ids: number[];
}
export interface MovieAxiosResponse {
  results: MovieApi[];
}
export interface MovieDetailsApi extends BaseApi {
  runtime?: number;
  release_date?: string;
  genres: Genres[];
}
