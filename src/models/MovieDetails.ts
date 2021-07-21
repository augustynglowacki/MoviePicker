import {Genres} from './Genres';

export interface MovieDetails {
  id: number;
  overview: string;
  runtime: number;
  title: string;
  vote_average: number;
  poster_path?: string;
  revenue: number;
  release_date: string;
  genres: Genres[];
}
