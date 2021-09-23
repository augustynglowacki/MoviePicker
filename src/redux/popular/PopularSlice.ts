import {createSlice} from '@reduxjs/toolkit';
import {PopularState} from 'src/models';
import {RootState} from '../rootReducer';
import {getPopular} from './PopularActions';

const initialState: PopularState = {
  movies: [],
  loading: false,
  error: '',
  page: Math.floor(Math.random() * 150) + 1,
};
const popularSlice = createSlice({
  name: 'popular',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getPopular.fulfilled, (state, action) => {
      state.movies.push(...action.payload);
      state.loading = false;
    });
    builder.addCase(getPopular.pending, state => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getPopular.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'error';
    });
  },
});

export default popularSlice.reducer;

export const {setPage} = popularSlice.actions;

export const popularSelector = (state: RootState) => state.popular;
