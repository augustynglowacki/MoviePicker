import {API_KEY} from '@env';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from 'src/helpers/axiosInstance';
import {convertToPopular} from 'src/helpers/convertResponse';
import {Popular, PopularAxiosResponse} from 'src/models';

const randomItem = Math.floor(Math.random() * 8) + 1; // get random items from database // to Delete

//Thunk action
export const getPopular = createAsyncThunk<Popular[]>(
  'movie/getPopular',
  async () => {
    const res = await axiosInstance.get<PopularAxiosResponse>(
      `movie/popular?api_key=${API_KEY}&language=en-US&page=${randomItem}`,
    );

    return convertToPopular(res.data.results, true);
  },
);
