import {API_KEY} from '@env';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';
import {Genres} from '../../models/Genres';

interface GenresAxiosResponse {
  genres: Array<Genres>;
}

export const getGenres = createAsyncThunk('genres/getGenres', async () => {
  const response = await axiosInstance.get<GenresAxiosResponse>(
    `genre/movie/list?api_key=${API_KEY}&language=en-US`,
  );

  const responseData: Genres[] = response.data.genres;

  return responseData;
});
