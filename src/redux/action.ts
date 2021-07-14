import {API_KEY} from '@env';
import axiosInstance from '../helpers/axiosInstance';
import {Movie, MovieAxiosResponse} from '../models';

export const fetchMovies = () => {
  return async (dispatch: any) => {
    dispatch({type: 'FETCH_MOVIES_REQUEST'});
    try {
      const res = await axiosInstance.get<MovieAxiosResponse>(
        `movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
      );
      const newresult = res.data.results.map((x: Movie) => ({
        id: x.id,
        title: x.title,
        vote_average: x.vote_average,
        poster_path: x.poster_path,
        overview: x.overview,
      }));
      dispatch({
        type: 'FETCH_MOVIES_SUCCES',
        payload: {movies: newresult},
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_MOVIES_FAILURE',
        payload: {error: error},
      });
      console.log(error);
    }
  };
};
