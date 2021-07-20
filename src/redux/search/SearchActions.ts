import {API_KEY} from '@env';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {convertResponseToMovie} from '../../helpers/convertResponseToMovie';
import {Actor, Movie, MovieAxiosResponse} from '../../models';
import axiosInstance from '../../helpers/axiosInstance';

export const getSearchedMovies = createAsyncThunk<Movie[]>(
  'search/getMovies',
  async (_, {getState}) => {
    const state: any = getState();
    const query = state.searchedData.query;

    const res = await axiosInstance.get<MovieAxiosResponse>(
      `search/movie?api_key=${API_KEY}&query=${query}&page=1`,
    );
    const newResult: Movie[] = convertResponseToMovie(res.data.results);
    return newResult;
  },
);

export const getSearchedTvShows = createAsyncThunk<Movie[]>(
  'search/getTvShows',
  async (_, {getState}) => {
    const state: any = getState();
    const query = state.searchedData.query;

    const res = await axiosInstance.get<MovieAxiosResponse>(
      `search/tv?api_key=${API_KEY}&query=${query}&page=1`,
    );
    const newResult: Movie[] = convertResponseToMovie(res.data.results);
    return newResult;
  },
);

export const getSearchedActor = createAsyncThunk<Actor[]>(
  'search/getActors',
  async (_, {getState}) => {
    const state: any = getState();
    const query = state.searchedData.query;

    const res = await axiosInstance.get(
      `search/person?api_key=${API_KEY}&query=${query}&page=1`,
    );
    const newResult: Actor[] = res.data.results;
    return newResult;
  },
);
