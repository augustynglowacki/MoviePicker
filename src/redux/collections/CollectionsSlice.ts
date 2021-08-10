import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Movie, MovieState} from 'src/models';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {RootState} from '../rootReducer';
import {getFavorite, getToWatch, getWatched} from './CollectionsActions';

interface CollectionsState {
  favorite: MovieState;
  watched: MovieState;
  toWatch: MovieState;
}

const initialState: CollectionsState = {
  favorite: {movies: [], error: '', loading: false},
  watched: {movies: [], error: '', loading: false},
  toWatch: {movies: [], error: '', loading: false},
};

const CollectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getFavorite.pending, state => {
      state.favorite.error = '';
      state.favorite.loading = true;
    });
    builder.addCase(
      getFavorite.fulfilled,
      (state, action: PayloadAction<Movie[]>) => {
        state.favorite.movies = action.payload;
        state.favorite.loading = false;
      },
    );
    builder.addCase(getFavorite.rejected, (state, action) => {
      state.favorite.error = action.error.message ?? 'error';
      state.favorite.loading = false;
    });
    builder.addCase(getWatched.pending, state => {
      state.watched.error = '';
      state.watched.loading = true;
    });
    builder.addCase(
      getWatched.fulfilled,
      (state, action: PayloadAction<Movie[]>) => {
        state.watched.movies = action.payload;
        state.watched.loading = false;
      },
    );
    builder.addCase(getWatched.rejected, (state, action) => {
      state.watched.error = action.error.message ?? 'error';
      state.watched.loading = false;
    });
    builder.addCase(getToWatch.pending, state => {
      state.toWatch.error = '';
      state.toWatch.loading = true;
    });
    builder.addCase(
      getToWatch.fulfilled,
      (state, action: PayloadAction<Movie[]>) => {
        state.toWatch.movies = action.payload;
        state.toWatch.loading = false;
      },
    );
    builder.addCase(getToWatch.rejected, (state, action) => {
      state.toWatch.error = action.error.message ?? 'error';
      state.toWatch.loading = false;
    });
  },
});

export default CollectionsSlice.reducer;
// export const collectionSelector = (state: RootState) => state.collections;
