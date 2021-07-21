import {MovieDetailsState} from './../../models/MovieDetailsState';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';
import {getMovieActors, getMovieDetails} from './movieDetailsActions';

const initialState: MovieDetailsState = {
  movieDetails: {
    id: 0,
    title: '',
    poster_path: '',
    overview: '',
    vote_average: 0,
    runtime: 0,
    revenue: 0,
    release_date: '',
  },

  loading: false,
  error: '',
  movieActors: [],
};

//createSlice is a function that accepts a "slice name", an initial state, and an object full of reducer functions.
//Then it automatically generates action creators and action types that correspond to the reducers and state.
const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getMovieDetails.fulfilled, (state, action) => {
      // Add user to the state array
      state.movieDetails = action.payload;
      state.loading = false;
    });
    builder.addCase(getMovieDetails.pending, state => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(getMovieDetails.rejected, (state, action) => {
      // Add user to the state array
      state.loading = false;
      console.log(action.error.message);
      state.error = action.error.message ?? 'error';
    });

    builder.addCase(getMovieActors.fulfilled, (state, action) => {
      // Add user to the state array
      state.movieActors = action.payload;
      state.loading = false;
    });
    builder.addCase(getMovieActors.pending, state => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(getMovieActors.rejected, (state, action) => {
      // Add user to the state array
      state.error = action.error.message ?? 'error';
    });
  },
});

//Since createSlice has taken care of building the reducer, we export it via: export default movieSlice.reducer;
export default movieDetailsSlice.reducer;
export const movieDetailsSelector = (state: RootState) => state.movieDetails;
export {getMovieDetails};
