import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Movie, MovieState} from 'src/models';
import {RootState} from '../rootReducer';
import {
  getFavorite,
  getWatchlist,
  getWatched,
  setFavorite,
  setWatchlist,
  setWatched,
} from './CollectionsActions';

interface CollectionsState {
  favorite: MovieState;
  watched: MovieState;
  watchlist: MovieState;
}

const initialState: CollectionsState = {
  favorite: {movies: [], error: '', loading: false},
  watched: {movies: [], error: '', loading: false},
  watchlist: {movies: [], error: '', loading: false},
};

const CollectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(setFavorite.pending, state => {
        state.favorite.error = '';
        state.favorite.loading = true;
      })
      .addCase(setFavorite.fulfilled, state => {
        state.favorite.loading = false;
      })
      .addCase(setFavorite.rejected, (state, action) => {
        state.favorite.error = action.error.message ?? 'error';
        state.favorite.loading = false;
      })
      .addCase(setWatchlist.pending, state => {
        state.watchlist.error = '';
        state.watchlist.loading = true;
      })
      .addCase(setWatchlist.fulfilled, state => {
        state.watchlist.loading = false;
      })
      .addCase(setWatchlist.rejected, (state, action) => {
        state.watchlist.error = action.error.message ?? 'error';
        state.watchlist.loading = false;
      })
      .addCase(setWatched.pending, state => {
        state.watched.error = '';
        state.watched.loading = true;
      })
      .addCase(setWatched.fulfilled, state => {
        state.watched.loading = false;
      })
      .addCase(setWatched.rejected, (state, action) => {
        state.watched.error = action.error.message ?? 'error';
        state.watched.loading = false;
      })
      .addCase(getFavorite.pending, state => {
        state.favorite.error = '';
        state.favorite.loading = true;
      })
      .addCase(
        getFavorite.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.favorite.movies = action.payload;
          state.favorite.loading = false;
        },
      )
      .addCase(getFavorite.rejected, (state, action) => {
        state.favorite.error = action.error.message ?? 'error';
        state.favorite.loading = false;
      })
      .addCase(getWatched.pending, state => {
        state.watched.error = '';
        state.watched.loading = true;
      })
      .addCase(
        getWatched.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.watched.movies = action.payload;
          state.watched.loading = false;
        },
      )
      .addCase(getWatched.rejected, (state, action) => {
        state.watched.error = action.error.message ?? 'error';
        state.watched.loading = false;
      })
      .addCase(getWatchlist.pending, state => {
        state.watchlist.error = '';
        state.watchlist.loading = true;
      })
      .addCase(
        getWatchlist.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.watchlist.movies = action.payload;
          state.watchlist.loading = false;
        },
      )
      .addCase(getWatchlist.rejected, (state, action) => {
        state.watchlist.error = action.error.message ?? 'error';
        state.watchlist.loading = false;
      });
  },
});

export default CollectionsSlice.reducer;
export const collectionsSelector = (state: RootState) => state.collections;
