import {Movie, MovieApi} from './movie';

export interface Popular extends Movie {
  voteAverage: number;
  title: string;
  genres: string[];
}
export interface PopularApi extends MovieApi {
  title: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
}
export interface PopularAxiosResponse {
  results: PopularApi[];
}
export interface PopularState {
  movies: Popular[];
  loading: boolean;
  error: string;
  page: number;
}
