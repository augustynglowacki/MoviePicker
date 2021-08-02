import {API_KEY} from '@env';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from 'src/helpers/axiosInstance';
import {convertResponseToMovie} from 'src/helpers/convertResponseToMovie';
import {Movie, MovieAxiosResponse} from 'src/models';

const randomItem = Math.floor(Math.random() * 8) + 1; // get random items from database // to Delete

//Thunk action
export const getMovies = createAsyncThunk<Movie[]>(
  'movie/getMovies',
  async () => {
    const res = await axiosInstance.get<MovieAxiosResponse>(
      `movie/popular?api_key=${API_KEY}&language=en-US&page=${randomItem}`, //same
    );

    const newresult: Movie[] = convertResponseToMovie(res.data.results);
    return newresult;
  },
);
