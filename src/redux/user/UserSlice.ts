import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';
import {
  createUserWithEmailAndPassword,
  logOutUser,
  signInWithEmailAndPassword,
  signInWithGoogle,
  updateEmail,
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.user.userName = action.payload;
    },
    setUserEmail: (state, action) => {
      state.user.email = action.payload;
    },
    setActiveUser: (state, action) => {
      state.user = action.payload;
    },
    setErrorNull: state => {
      state.error = '';
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
      if (action.error.message) {
        let temp = action.error.message.split(']');
        state.error = temp[1];
      }
    });
    builder.addCase(updateEmail.fulfilled, (state, action) => {
      state.user.email = action.payload;
    });
    builder.addCase(updateEmail.pending, state => {
      state.loading = true;
    });
    builder.addCase(updateEmail.rejected, (state, action) => {
      state.loading = false;
      if (action.error.message) {
        let temp = action.error.message.split(']');
        state.error = temp[1];
      }
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
      if (action.error.message) {
        let temp = action.error.message.split(']');
        state.error = temp[1];
      }
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
        if (action.error.message) {
          let temp = action.error.message.split(']');
          state.error = temp[1];
        }
      },
    );
    builder.addCase(signInWithGoogle.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(signInWithGoogle.pending, state => {
      state.loading = true;
    });
    builder.addCase(signInWithGoogle.rejected, state => {
      state.loading = false;
    });
  },
});
export const {setActiveUser, setErrorNull, setUserName, setUserEmail} =
  userSlice.actions;

export const userThunkSelector = (state: RootState) => state.users;

export default userSlice.reducer;
