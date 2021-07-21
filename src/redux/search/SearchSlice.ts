import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Movie, SearchState} from '../../models';
import {RootState} from '../rootReducer';
import {
  getSearchedActor,
  getSearchedMovies,
  getSearchedTvShows,
} from './SearchActions';

const initialState: SearchState = {
  query: '',
  foundMovies: {movies: [], error: '', loading: false},
  foundTvShows: {movies: [], error: '', loading: false},
  foundActors: {actors: [], error: ''},
};

const SearchSlice = createSlice({
  name: 'searchedData',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getSearchedMovies.pending, state => {
      state.foundMovies.error = '';
      state.foundMovies.loading = true;
    });
    builder.addCase(
      getSearchedMovies.fulfilled,
      (state, action: PayloadAction<Movie[]>) => {
        state.foundMovies.movies = action.payload;
        state.foundMovies.loading = false;
      },
    );
    builder.addCase(getSearchedMovies.rejected, (state, action) => {
      state.foundMovies.error = action.error.message ?? 'error';
      state.foundMovies.loading = false;
    });
    builder.addCase(getSearchedTvShows.pending, state => {
      state.foundTvShows.error = '';
      state.foundTvShows.loading = true;
    });
    builder.addCase(
      getSearchedTvShows.fulfilled,
      (state, action: PayloadAction<Movie[]>) => {
        state.foundTvShows.movies = action.payload;
        state.foundTvShows.loading = false;
      },
    );
    builder.addCase(getSearchedTvShows.rejected, (state, action) => {
      state.foundTvShows.error = action.error.message ?? 'error';
      state.foundTvShows.loading = false;
    });
    builder.addCase(getSearchedActor.pending, state => {
      state.foundActors.error = '';
    });
    builder.addCase(getSearchedActor.fulfilled, (state, action) => {
      state.foundActors.actors = action.payload;
    });
    builder.addCase(getSearchedActor.rejected, (state, action) => {
      state.foundActors.error = action.error.message ?? 'error';
    });
  },
});

export default SearchSlice.reducer;
export const {setQuery} = SearchSlice.actions;
export const SearchSelector = (state: RootState) => state.searchedData;
