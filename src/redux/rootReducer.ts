import {combineReducers} from '@reduxjs/toolkit';
import PopularSliceReducer from './popular/PopularSlice';
import SearchSliceReducer from './search/SearchSlice';
import DetailsSliceReducer from './details/DetailsSlice';
import userSliceReducer from './user/UserSlice';

// Combining multiple reducers - more will be added in the future
const rootReducer = combineReducers({
  popular: PopularSliceReducer,
  users: userSliceReducer,
  searchedData: SearchSliceReducer,
  details: DetailsSliceReducer,
});
//We declared RootState, which we’ll use in our selectors, for strongly-typed access to our Redux state.
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
