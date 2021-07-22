import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';
import {
  createUserWithEmailAndPassword,
  logOutUser,
  signInWithEmailAndPassword,
} from './UserAction';

interface UserState {
  loading: boolean;
  error: string;
  user: User;
}

const initialState: UserState = {
  loading: false,
  error: '',
  user: {email: '', userName: ''},
};

export interface User {
  email: string | null;
  userName: string | null;
}

const userThunkSlice = createSlice({
  name: 'userThunk',
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(signInWithEmailAndPassword.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(signInWithEmailAndPassword.pending, state => {
      state.loading = true;
    });
    builder.addCase(signInWithEmailAndPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'error';
    });
    builder.addCase(logOutUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(logOutUser.fulfilled, state => {
      state.user.email = '';
      state.user.userName = '';
      state.loading = false;
    });
    builder.addCase(logOutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'error';
    });
    builder.addCase(
      createUserWithEmailAndPassword.fulfilled,
      (state, action) => {
        state.user = action.payload;
        state.loading = false;
      },
    );
    builder.addCase(createUserWithEmailAndPassword.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      createUserWithEmailAndPassword.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'error';
      },
    );
  },
});
export const {setActiveUser} = userThunkSlice.actions;

export const userThunkSelector = (state: RootState) => state.usersThunk;

export default userThunkSlice.reducer;
