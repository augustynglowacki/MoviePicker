import axios from 'axios';
import {Movie, MovieAxiosResponse, MovieStore} from '../../models';

export function createMoviesStore(): MovieStore {
  return {
    //----------------------- Observables - our state ---------------------------
    movies: [
      {id: 0, title: '', vote_average: 0, poster_path: '', overview: ''},
    ],
    loading: false,
    error: '',
    //---------------------------------------------------------------------------
    //-------------- Actions are anything that modify the state. ----------------
    setMovies(movies: Movie[]) {
      this.movies = movies;
      this.loading = false;
    },
    setLoading(loading: boolean) {
      this.loading = loading;
    },
    setError(error: string) {
      this.error = error;
      this.loading = false;
    },
    async load() {
      this.setLoading(true);
      try {
        const res = await axios.get<MovieAxiosResponse>(
          'https://api.themoviedb.org/3/movie/popular?api_key=&language=en-US&page=1',
        );
        //Mapping our res.data.results, which return full details about movie to a new array which only has the properties that we need.
        const newresult = res.data.results.map((x: any) => ({
          id: x.id,
          title: x.title,
          vote_average: x.vote_average,
          poster_path: x.poster_path,
          overview: x.overview,
        }));
        this.setMovies(newresult);
      } catch (error) {
        this.setError(error);
      }
    },
    //---------------------------------------------------------------------------
    //Computed values are values that can be derived from the existing state or other computed values.
    //---------------------------------------------------------------------------
  };
}
