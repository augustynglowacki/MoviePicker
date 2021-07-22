import {combineReducers} from '@reduxjs/toolkit';
import MoviesSliceReducer from './movie/MovieSlice';
import GenresSliceReducer from './genres/GenresSlice';
import SearchSliceReducer from './search/SearchSlice';
import MovieDetailsReducer from './movieDetails/movieDetailsSlice';
import userThunkSlice from './userThunk/UserSlice';

// Combining multiple reducers - more will be added in the future
const rootReducer = combineReducers({
  movies: MoviesSliceReducer,
  usersThunk: userThunkSlice,
  genres: GenresSliceReducer,
  searchedData: SearchSliceReducer,
  movieDetails: MovieDetailsReducer,
});
//We declared RootState, which we’ll use in our selectors, for strongly-typed access to our Redux state.
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
