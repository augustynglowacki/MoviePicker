import {createSlice} from '@reduxjs/toolkit';
import {MovieState} from 'src/models';
import {RootState} from '../rootReducer';
import {getMovies} from './PopularActions';

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: '',
};
const popularSlice = createSlice({
  name: 'popular',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.loading = false;
    });
    builder.addCase(getMovies.pending, state => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'error';
    });
  },
});

export default popularSlice.reducer;
export const popularSelector = (state: RootState) => state.popular;
export {getMovies};
