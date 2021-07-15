import {API_KEY} from '@env';
import axiosInstance from '../helpers/axiosInstance';
import {Movie, MovieAxiosResponse} from '../models';
import {Dispatch} from 'redux';
import {
  GET_MOVIES_REJECTED,
  GET_MOVIES_PENDING,
  GET_MOVIES_SUCCES,
  MovieActionTypes,
  GetMoviesPending,
  GetMoviesSucces,
  GetMoviesRejected,
} from './moviesType';

const getMoviePending = (): GetMoviesPending => {
  return {
    type: GET_MOVIES_PENDING,
  };
};

const getMoviesSucces = (results: Movie[]): GetMoviesSucces => {
  return {
    type: GET_MOVIES_SUCCES,
    payload: results,
  };
};

const getMoviesRejected = (error: string): GetMoviesRejected => {
  return {
    type: GET_MOVIES_REJECTED,
    payload: error,
  };
};

export const fetchMovies = () => {
  return async (dispatch: Dispatch<MovieActionTypes>) => {
    dispatch(getMoviePending());
    try {
      const results = await axiosInstance.get<MovieAxiosResponse>(
        `movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
      );
      const newresult: Movie[] = results.data.results.map((result: Movie) => ({
        id: result.id,
        title: result.title,
        vote_average: result.vote_average,
        poster_path: result.poster_path,
        overview: result.overview,
      }));
      dispatch(getMoviesSucces(newresult));
    } catch (error) {
      dispatch(getMoviesRejected(error));
    }
  };
};
