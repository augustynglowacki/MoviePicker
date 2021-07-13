import {Movie} from './Movie';

export interface MovieState {
  movies: Array<Movie>;
  loading: boolean;
  error: string;
}
