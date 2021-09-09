import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Movie} from 'src/models';
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
  favorite: Movie[];
  watched: Movie[];
  watchlist: Movie[];
  error: string;
  loading: boolean;
}

const initialState: CollectionsState = {
  favorite: [],
  watched: [],
  watchlist: [],
  error: '',
  loading: false,
};

const CollectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(setFavorite.pending, state => {
        state.error = '';
        state.loading = true;
      })
      .addCase(setFavorite.fulfilled, state => {
        state.loading = false;
      })
      .addCase(setFavorite.rejected, (state, action) => {
        state.error = action.error.message ?? 'error';
        state.loading = false;
      })
      .addCase(setWatchlist.pending, state => {
        state.error = '';
        state.loading = true;
      })
      .addCase(setWatchlist.fulfilled, state => {
        state.loading = false;
      })
      .addCase(setWatchlist.rejected, (state, action) => {
        state.error = action.error.message ?? 'error';
        state.loading = false;
      })
      .addCase(setWatched.pending, state => {
        state.error = '';
        state.loading = true;
      })
      .addCase(setWatched.fulfilled, state => {
        state.loading = false;
      })
      .addCase(setWatched.rejected, (state, action) => {
        state.error = action.error.message ?? 'error';
        state.loading = false;
      })
      .addCase(getFavorite.pending, state => {
        state.error = '';
        state.loading = true;
      })
      .addCase(
        getFavorite.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.favorite = action.payload;
          state.loading = false;
        },
      )
      .addCase(getFavorite.rejected, (state, action) => {
        state.error = action.error.message ?? 'error';
        state.loading = false;
      })
      .addCase(getWatched.pending, state => {
        state.error = '';
        state.loading = true;
      })
      .addCase(
        getWatched.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.watched = action.payload;
          state.loading = false;
        },
      )
      .addCase(getWatched.rejected, (state, action) => {
        state.error = action.error.message ?? 'error';
        state.loading = false;
      })
      .addCase(getWatchlist.pending, state => {
        state.error = '';
        state.loading = true;
      })
      .addCase(
        getWatchlist.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.watchlist = action.payload;
          state.loading = false;
        },
      )
      .addCase(getWatchlist.rejected, (state, action) => {
        state.error = action.error.message ?? 'error';
        state.loading = false;
      });
  },
});

export default CollectionsSlice.reducer;
export const collectionsSelector = (state: RootState) => state.collections;
