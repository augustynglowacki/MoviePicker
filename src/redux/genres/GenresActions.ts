import {API_KEY} from '@env';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from 'src/helpers/axiosInstance';
import {Genres} from 'src/models';

interface GenresAxiosResponse {
  genres: Genres[]; // Genres[]
}

export const getGenres = createAsyncThunk('genres/getGenres', async () => {
  const response = await axiosInstance.get<GenresAxiosResponse>(
    `genre/movie/list?api_key=${API_KEY}&language=en-US`, // create api/movies.ts and export this api link from there
  );

  const responseData: Genres[] = response.data.genres;

  return responseData;
});
