import {combineReducers} from '@reduxjs/toolkit';
import MoviesSliceReducer from './movie/MovieSlice';
import SearchSliceReducer from './search/SearchSlice';
import MovieDetailsReducer from './movieDetails/movieDetailsSlice';
import userSliceReducer from './user/UserSlice';

// Combining multiple reducers - more will be added in the future
const rootReducer = combineReducers({
  movies: MoviesSliceReducer,
  users: userSliceReducer,
  searchedData: SearchSliceReducer,
  movieDetails: MovieDetailsReducer,
});
//We declared RootState, which we’ll use in our selectors, for strongly-typed access to our Redux state.
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
