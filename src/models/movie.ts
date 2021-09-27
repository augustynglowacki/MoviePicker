import {ContentType} from './contentType';

export interface Movie {
  posterPath: string;
  id: number;
  contentType: ContentType;
}
export interface MovieApi {
  id: number;
  poster_path: string;
}
export interface MovieAxiosResponse {
  results: MovieApi[];
}
export interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string;
}
