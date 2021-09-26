import {API_KEY} from '@env';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from 'src/helpers/axiosInstance';
import {convertToPopular} from 'src/helpers/convertResponse';
import {Popular, PopularAxiosResponse} from 'src/models';

export const getPopular = createAsyncThunk<Popular[], number>(
  'movie/getPopular',
  async page => {
    const res = await axiosInstance.get<PopularAxiosResponse>(
      `movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
    );
    return convertToPopular(res.data.results, true);
  },
);
