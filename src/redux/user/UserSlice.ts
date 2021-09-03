import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';
import {
  createUserWithEmailAndPassword,
  logOutUser,
  signInWithEmailAndPassword,
  signInWithGoogle,
  updateUserEmail,
  updateUserPassword,
  updateUserPhoto,
} from './UserAction';

interface UserState {
  loading: boolean;
  error: string;
  user: User;
}

const initialState: UserState = {
  loading: false,
  error: '',
  user: {id: '', email: '', userName: '', avatar: '', coverPhoto: ''},
};

export interface User {
  id: string;
  email: string;
  userName: string;
  avatar: string;
  coverPhoto: string;
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
      state.error = '';
    });
    builder.addCase(signInWithEmailAndPassword.rejected, (state, action) => {
      state.loading = false;
      if (action.error.message) {
        let temp = action.error.message.split(']');
        state.error = temp[1];
      }
    });
    builder.addCase(updateUserEmail.fulfilled, (state, action) => {
      state.user.email = action.payload;
      state.loading = false;
    });
    builder.addCase(updateUserEmail.pending, state => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(updateUserEmail.rejected, (state, action) => {
      state.loading = false;
      if (action.error.message) {
        let temp = action.error.message.split(']');
        state.error = temp[1];
      }
    });
    builder.addCase(updateUserPassword.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(updateUserPassword.pending, state => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(updateUserPassword.rejected, (state, action) => {
      state.loading = false;
      if (action.error.message) {
        let temp = action.error.message.split(']');
        state.error = temp[1];
      }
    });
    builder.addCase(logOutUser.pending, state => {
      state.loading = true;
      state.error = '';
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
      state.error = '';
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
      state.error = '';
    });
    builder.addCase(signInWithGoogle.rejected, state => {
      state.loading = false;
    });
    builder.addCase(updateUserPhoto.fulfilled, (state, action) => {
      state.user.avatar = action.payload;
      state.loading = false;
    });
    builder.addCase(updateUserPhoto.pending, state => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(updateUserPhoto.rejected, (state, action) => {
      state.loading = false;
      if (action.error.message) {
        let temp = action.error.message.split(']');
        state.error = temp[1];
      }
    });
  },
});
export const {setActiveUser, setErrorNull, setUserName, setUserEmail} =
  userSlice.actions;

export const userThunkSelector = (state: RootState) => state.users;

export default userSlice.reducer;
