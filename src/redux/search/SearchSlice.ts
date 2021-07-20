import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Movie, SearchState} from '../../models';
import {RootState} from '../rootReducer';
import {getSearchedMovies} from './SearchActions';

const initialState: SearchState = {
  query: '',
  movies: {movies: [], error: '', loading: false},
  tvShows: {movies: [], error: '', loading: false},
};

const SearchSlice = createSlice({
  name: 'searched',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getSearchedMovies.pending, state => {
      state.movies.loading = true;
      state.movies.error = '';
    });
    builder.addCase(
      getSearchedMovies.fulfilled,
      (state, action: PayloadAction<Movie[]>) => {
        state.movies.loading = false;
        state.movies.movies = action.payload;
      },
    );
    builder.addCase(getSearchedMovies.rejected, (state, action) => {
      state.movies.loading = false;
      state.movies.error = action.error.message ?? "Couldn't load movies.";
    });
  },
});

export default SearchSlice.reducer;
export const {setQuery} = SearchSlice.actions;
export const movieSelector = (state: RootState) => state.searchData;
