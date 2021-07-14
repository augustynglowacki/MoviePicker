import {API_KEY} from '@env';
import axiosInstance from '../helpers/axiosInstance';
import {Movie, MovieAxiosResponse} from '../models';
import {Dispatch} from 'redux';
import {
  GET_MOVIES_REJECTED,
  GET_MOVIES_PENDING,
  GET_MOVIES_SUCCES,
  MovieActionTypes,
} from './moviesType';

export const fetchMovies = () => {
  return async (dispatch: Dispatch<MovieActionTypes>) => {
    dispatch({type: GET_MOVIES_PENDING});
    try {
      const results = await axiosInstance.get<MovieAxiosResponse>(
        `movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
      );
      const newresult = results.data.results.map((result: Movie) => ({
        id: result.id,
        title: result.title,
        vote_average: result.vote_average,
        poster_path: result.poster_path,
        overview: result.overview,
      }));
      dispatch({
        type: GET_MOVIES_SUCCES,
        payload: newresult,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_MOVIES_REJECTED,
        payload: error,
      });
    }
  };
};
