import {GenresAxiosResponse} from './../../models/GenresAxiosResponse';
import {API_KEY} from '@env';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';
import {Genres} from '../../models/Genres';

//Thunk action

export const getGenres = createAsyncThunk('genres/getGenres', async () => {
  const response = await axiosInstance.get<GenresAxiosResponse>(
    `genre/movie/list?api_key=${API_KEY}&language=en-US`,
  );
  //Mapping our res.data.results, which return full details about movie to a new array which only has the properties that we need.

  //   const newresult: Movie[] = response.data.results.map((x: any) => ({
  //     id: x.id,
  //     title: x.title,
  //     vote_average: x.vote_average,
  //     poster_path: x.poster_path,
  //     overview: x.overview,
  //     genre_ids: x.genre_ids,
  //   }));

  const responseData: Genres[] = response.data.genres;

  return responseData;
});
