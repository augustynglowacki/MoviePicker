import {Genres} from './Genres';

export interface GenresState {
  genres: Array<Genres>;
  loading: boolean;
  error: string;
}
