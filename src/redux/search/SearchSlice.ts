import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Actor, Movie, MovieState} from '../../models';
import {RootState} from '../rootReducer';
import {
  getSearchedActor,
  getSearchedMovies,
  getSearchedTvSeries,
} from './SearchActions';
interface SearchState {
  query: string;
  foundMovies: MovieState;
  foundTvSeries: MovieState;
  foundActors: {actors: Actor[]; error: string};
}

const initialState: SearchState = {
  query: '',
  foundMovies: {movies: [], error: '', loading: false},
  foundTvSeries: {movies: [], error: '', loading: false},
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
    builder.addCase(getSearchedTvSeries.pending, state => {
      state.foundTvSeries.error = '';
      state.foundTvSeries.loading = true;
    });
    builder.addCase(
      getSearchedTvSeries.fulfilled,
      (state, action: PayloadAction<Movie[]>) => {
        state.foundTvSeries.movies = action.payload;
        state.foundTvSeries.loading = false;
      },
    );
    builder.addCase(getSearchedTvSeries.rejected, (state, action) => {
      state.foundTvSeries.error = action.error.message ?? 'error';
      state.foundTvSeries.loading = false;
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
