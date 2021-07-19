import {createSlice} from '@reduxjs/toolkit';
import {MovieState} from '../../models';
import {RootState} from '../rootReducer';
import {getMovies} from './MovieActions';

const initialState: MovieState = {
  movies: [{id: 0, title: '', vote_average: 0, poster_path: '', overview: ''}],
  loading: false,
  error: '',
};

//createSlice is a function that accepts a "slice name", an initial state, and an object full of reducer functions.
//Then it automatically generates action creators and action types that correspond to the reducers and state.
const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getMovies.fulfilled, (state, action) => {
      // Add user to the state array
      state.movies = action.payload;
      state.loading = false;
    });
    builder.addCase(getMovies.pending, state => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(getMovies.rejected, (state, action) => {
      // Add user to the state array
      state.loading = false;
      console.log('dupa');
      console.log(action.error.message);
      state.error = action.error.message ?? 'error';
    });
  },
});

//Since createSlice has taken care of building the reducer, we export it via: export default movieSlice.reducer;
export default movieSlice.reducer;
export const movieSelector = (state: RootState) => state.movies;
export {getMovies};
