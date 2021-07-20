import {
  API_KEY,
  API_SEARCH_ACTORS,
  API_SEARCH_MOVIES,
  API_SEARCH_TV_SHOWS,
} from '@env';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {convertResponseToMovie} from '../../helpers/convertResponseToMovie';
import {Actor, Movie, MovieAxiosResponse} from '../../models';
import store from '../store';

export const getSearchedMovies = createAsyncThunk<Movie[]>(
  'search/getMovies',
  async () => {
    // fix this error
    const state = store.getState();
    const query = state.searchedData.query;
    //
    const res = await axios.get<MovieAxiosResponse>(
      `${API_SEARCH_MOVIES}?api_key=${API_KEY}&query=${query}&page=1`,
    );
    const newResult: Movie[] = convertResponseToMovie(res.data.results);
    return newResult;
  },
);

export const getSearchedTvShows = createAsyncThunk<Movie[]>(
  'search/getTvShows',
  async () => {
    // fix this error
    const state = store.getState();
    const query = state.searchedData.query;
    //
    const res = await axios.get<MovieAxiosResponse>(
      `${API_SEARCH_TV_SHOWS}?api_key=${API_KEY}&query=${query}&page=1`,
    );
    const newResult: Movie[] = convertResponseToMovie(res.data.results);
    return newResult;
  },
);

export const getSearchedActor = createAsyncThunk<Actor[]>(
  'search/getActors',
  async () => {
    // fix this error
    const state = store.getState();
    const query = state.searchedData.query;
    //
    const res = await axios.get(
      `${API_SEARCH_ACTORS}?api_key=${API_KEY}&query=${query}&page=1`,
    );
    const newResult: Actor[] = res.data.results;
    return newResult;
  },
);
