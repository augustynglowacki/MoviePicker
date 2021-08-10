import {createSlice} from '@reduxjs/toolkit';
import {PopularState} from 'src/models';
import {RootState} from '../rootReducer';
import {getPopular} from './PopularActions';

const initialState: PopularState = {
  movies: [],
  loading: false,
  error: '',
};
const popularSlice = createSlice({
  name: 'popular',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPopular.fulfilled, (state, action) => {
      state.movies = action.payload;
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
export const popularSelector = (state: RootState) => state.popular;
export {getPopular};
