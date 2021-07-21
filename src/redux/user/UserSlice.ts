import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';

const initialState: User = {
  email: '',
  userName: '',
};

interface User {
  email: string;
  userName: string;
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.email = action.payload.email;
      state.userName = action.payload.userName;
    },
    setUserLogOutState: state => {
      state.email = initialState.email;
      state.userName = initialState.userName;
    },
  },
});

export const {setActiveUser, setUserLogOutState} = userSlice.actions;

export const userSelector = (state: RootState) => state.users;

export default userSlice.reducer;
