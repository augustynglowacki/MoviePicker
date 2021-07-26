import {API_KEY} from '@env';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';
import {convertResponseToMovie} from '../../helpers/convertResponseToMovie';
import {Movie, MovieAxiosResponse} from '../../models';

//Thunk action
export const getMovies = createAsyncThunk<Movie[]>(
  'movie/getMovies',
  async () => {
    const res = await axiosInstance.get<MovieAxiosResponse>(
      `movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
    );

    const newresult: Movie[] = convertResponseToMovie(res.data.results);
    return newresult;
  },
);
