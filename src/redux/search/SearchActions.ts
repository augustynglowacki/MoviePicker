import {API_KEY} from '@env';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  Actor,
  Movie,
  MovieAxiosResponse,
  SearchActorsAxiosResponse,
} from 'src/models';
import axiosInstance from 'src/helpers/axiosInstance';
import {convertToMovie} from 'src/helpers/convertResponse';

export const getSearchedMovies = createAsyncThunk<Movie[]>(
  'search/getMovies',
  async (_, {getState}) => {
    const state: any = getState();
    const query = state.searchedData.query;

    const res = await axiosInstance.get<MovieAxiosResponse>(
      `search/movie?api_key=${API_KEY}&query=${query}&page=1`,
    );
    return convertToMovie(res.data.results, true);
  },
);

export const getSearchedTvSeries = createAsyncThunk<Movie[]>(
  'search/getTvSeries',
  async (_, {getState}) => {
    const state: any = getState();
    const query = state.searchedData.query;

    const res = await axiosInstance.get<MovieAxiosResponse>(
      `search/tv?api_key=${API_KEY}&query=${query}&page=1`,
    );
    return convertToMovie(res.data.results, false);
  },
);

export const getSearchedActor = createAsyncThunk<Actor[]>(
  'search/getActors',
  async (_, {getState}) => {
    const state: any = getState();
    const query = state.searchedData.query;

    const res = await axiosInstance.get<SearchActorsAxiosResponse>(
      `search/person?api_key=${API_KEY}&query=${query}&page=1`,
    );
    return res.data.results.map(actor => ({
      id: actor.id,
      name: actor.name,
      profilePath: actor.profile_path,
    }));
  },
);
