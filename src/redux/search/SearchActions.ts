import {API_KEY, API_SEARCH_MOVIES} from '@env';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {convertResponseToMovie} from '../../helpers/convertResponseToMovie';
import {Movie, MovieAxiosResponse} from '../../models';
import store from '../store';

export const getSearchedMovies = createAsyncThunk<Movie[]>(
  'search/getMovies',
  async () => {
    // fix this error
    const state = store.getState();
    const query = state.searchedData.query;
    //
    const res = await axios.get<MovieAxiosResponse>(
      `${API_SEARCH_MOVIES}?api_key=${API_KEY}&language=en-US&query=${query}&page=1`,
    );
    const newResult: Movie[] = convertResponseToMovie(res.data.results);
    return newResult;
  },
);
