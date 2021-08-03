import {Genres} from '.';

interface Base {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  overview: string;
}
export interface Movie extends Base {
  genres: string[];
  isMovie?: boolean;
}
export interface MovieDetails extends Base {
  runtime?: number;
  release_date?: string;
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
