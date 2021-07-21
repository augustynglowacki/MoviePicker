import {getGenres} from './GenresActions';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';
import {GenresState} from '../../models/GenresState';

const initialState: GenresState = {
  genres: [
    {
      id: 0,
      name: '',
    },
  ],
  loading: false,
  error: '',
};

//createSlice is a function that accepts a "slice name", an initial state, and an object full of reducer functions.
//Then it automatically generates action creators and action types that correspond to the reducers and state.
const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getGenres.fulfilled, (state, action) => {
      // Add user to the state array
      state.genres = action.payload;
      state.loading = false;
    });
    builder.addCase(getGenres.pending, state => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(getGenres.rejected, (state, action) => {
      // Add user to the state array
      state.loading = false;
      console.log(action.error.message);
      state.error = action.error.message ?? 'error';
    });
  },
});

//Since createSlice has taken care of building the reducer, we export it via: export default movieSlice.reducer;
export default genresSlice.reducer;
export const genresSelector = (state: RootState) => state.genres;
export {getGenres};