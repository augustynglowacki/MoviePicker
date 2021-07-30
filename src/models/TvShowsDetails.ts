import {Genres} from '.';

export interface TvShowsDetails {
  title: string;
  number_of_episodes?: number;
  number_of_seasons?: number;
  vote_average: number;
  poster_path: string;
  seasons?: [];
  id: number;
  overview: string;
  genres: Genres[];
  release_date?: string;
}
