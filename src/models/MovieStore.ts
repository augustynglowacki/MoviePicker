import {Movie} from './Movie';

export interface MovieStore {
  movies: Movie[];
  loading: boolean;
  error: string;
  setMovies: (movies: Movie[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  load: () => void;
}
