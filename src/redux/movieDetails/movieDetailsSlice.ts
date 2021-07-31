import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';
import {
  getMovieActors,
  getMovieDetails,
  getTvSeries,
} from './movieDetailsActions';
import {Actor, MovieDetails, TvSeriesDetails} from '../../models';

interface MovieDetailsState {
  fetchedMovies: Record<number, MovieDetails>;
  fetchedTvSeries: Record<number, TvSeriesDetails>;
  loading: boolean;
  error: string;
  movieActors: Actor[];
}

const initialState: MovieDetailsState = {
  fetchedMovies: {},
  fetchedTvSeries: {},
  loading: false,
  error: '',
  movieActors: [],
};

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getMovieDetails.fulfilled, (state, action) => {
      state.fetchedMovies = {
        ...state.fetchedMovies,
        [action.payload.id]: action.payload,
      };

      state.loading = false;
    });
    builder.addCase(getMovieDetails.pending, state => {
      state.loading = true;
    });
    builder.addCase(getMovieDetails.rejected, (state, action) => {
      // Add user to the state array
      state.loading = false;
      console.log(action.error.message);
      state.error = action.error.message ?? 'error';
    });

    builder.addCase(getTvSeries.fulfilled, (state, action) => {
      state.fetchedTvSeries = {
        ...state.fetchedTvSeries,
        [action.payload.id]: action.payload,
      };
    });

    builder.addCase(getTvSeries.pending, state => {
      state.loading = true;
    });
    builder.addCase(getTvSeries.rejected, (state, action) => {
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
