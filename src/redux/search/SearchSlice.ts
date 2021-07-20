import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Movie, SearchState} from '../../models';
import {RootState} from '../rootReducer';
import {getSearchedMovies} from './SearchActions';

const initialState: SearchState = {
  query: '',
  foundMovies: {movies: [], error: '', loading: false},
  foundTvShows: {movies: [], error: '', loading: false},
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
  },
});

export default SearchSlice.reducer;
export const {setQuery} = SearchSlice.actions;
export const SearchSelector = (state: RootState) => state.searchedData;
