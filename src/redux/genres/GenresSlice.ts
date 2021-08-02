import {getGenres} from './GenresActions';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';
import {Genres} from 'src/models';

interface GenresState {
  genres: Genres[];
  loading: boolean;
  error: string;
}

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

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.loading = false;
    });
    builder.addCase(getGenres.pending, state => {
      state.loading = true;
    });
    builder.addCase(getGenres.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'error';
    });
  },
});

export default genresSlice.reducer;
export const genresSelector = (state: RootState) => state.genres;
export {getGenres};
