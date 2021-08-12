import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';
import {
  getMovieActors,
  getMovieDetails,
  getTvSeriesDetails,
  getTvSeriesActors,
} from './DetailsActions';
import {Actor, MovieDetails, TvSeriesDetails} from 'src/models';

interface DetailsState {
  fetchedMovies: Record<number, MovieDetails>;
  fetchedTvSeries: Record<number, TvSeriesDetails>;
  loading: boolean;
  error: string;
  movieActors: Actor[];
  tvSeriesActors: Actor[];
}

const initialState: DetailsState = {
  fetchedMovies: {},
  fetchedTvSeries: {},
  loading: false,
  error: '',
  movieActors: [],
  tvSeriesActors: [],
};

const detailsSlice = createSlice({
  name: 'details',
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
      state.error = '';
    });
    builder.addCase(getMovieDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'error';
    });
    builder.addCase(getTvSeriesDetails.fulfilled, (state, action) => {
      state.fetchedTvSeries = {
        ...state.fetchedTvSeries,
        [action.payload.id]: action.payload,
      };
    });
    builder.addCase(getTvSeriesDetails.pending, state => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getTvSeriesDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'error';
    });

    builder.addCase(getMovieActors.fulfilled, (state, action) => {
      state.movieActors = action.payload;
      state.loading = false;
    });
    builder.addCase(getMovieActors.pending, state => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getMovieActors.rejected, (state, action) => {
      state.error = action.error.message ?? 'error';
    });

    builder.addCase(getTvSeriesActors.fulfilled, (state, action) => {
      state.tvSeriesActors = action.payload;
      state.loading = false;
    });
    builder.addCase(getTvSeriesActors.pending, state => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getTvSeriesActors.rejected, (state, action) => {
      state.error = action.error.message ?? 'error';
    });
  },
});

export default detailsSlice.reducer;

export const detailsSelector = (state: RootState) => state.details;
