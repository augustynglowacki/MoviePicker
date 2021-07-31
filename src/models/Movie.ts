import {Genres} from '.';

interface Base {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  overview: string;
}
export interface Movie extends Base {
  genre_ids: number[];
  isMovie?: boolean;
}
export interface MovieDetails extends Base {
  runtime?: number;
  revenue?: number;
  release_date?: string;
  genres: Genres[];
}
export interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string;
}

export interface MovieAxiosResponse {
  results: Movie[];
}
