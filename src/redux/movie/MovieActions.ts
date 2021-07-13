import {API_KEY} from '@env';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';
import {Movie, MovieAxiosResponse} from '../../models';

//Thunk action

export const getMovies = createAsyncThunk('movie/getMovies', async () => {
  const res = await axiosInstance.get<MovieAxiosResponse>(
    `movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
  );
  //Mapping our res.data.results, which return full details about movie to a new array which only has the properties that we need.
  const newresult: Movie[] = res.data.results.map((x: any) => ({
    id: x.id,
    title: x.title,
    vote_average: x.vote_average,
    poster_path: x.poster_path,
    overview: x.overview,
  }));
  return newresult;
});
