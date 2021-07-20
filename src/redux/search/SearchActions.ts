import {API_KEY, API_SEARCH_MOVIES} from '@env';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {convertResponseToMovie} from '../../helpers/convertResponseToMovie';
import {Movie, MovieAxiosResponse} from '../../models';

export const getSearchedMovies = createAsyncThunk<Movie[]>(
  'search/getMovies',
  async () => {
    const res = await axios.get<MovieAxiosResponse>(
      `${API_SEARCH_MOVIES}?api_key=${API_KEY}&language=en-US&query=${query}&page=1`,
    );
    const newresult: Movie[] = convertResponseToMovie(res.data.results);
    return newresult;
  },
);
