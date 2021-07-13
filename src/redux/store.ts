import {configureStore, Action} from '@reduxjs/toolkit';
import {ThunkAction} from 'redux-thunk';
import rootReducer, {RootState} from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

//Whenever we use a thunk for API calls/async logic, it’s type will be AppThunk.
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

//Whenever we use dispatch, it’s type will be AppDispatch,
export type AppDispatch = typeof store.dispatch;

export default store;
