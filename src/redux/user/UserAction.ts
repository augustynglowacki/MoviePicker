import auth from '@react-native-firebase/auth';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {BackendUser} from '../../models';
import {User} from './UserSlice';

interface LoginUser {
  email: string;
  password: string;
}

export const signInWithEmailAndPassword = createAsyncThunk(
  'auth/signIn',
  async ({email, password}: LoginUser) => {
    const res = await auth().signInWithEmailAndPassword(email, password);
    const newUser: User = {
      email: res.user.email,
      userName: res.user.displayName,
    };
    return newUser;
  },
);

export const logOutUser = createAsyncThunk(
  'auth/logOut',
  async () => await auth().signOut(),
);

export const createUserWithEmailAndPassword = createAsyncThunk(
  'auth/register',
  async ({email, password, displayName}: BackendUser) => {
    const authUser = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    const updateProfile = await authUser.user.updateProfile({
      displayName: displayName,
    });

    console.log(updateProfile);
    const displayNameFirebase = await auth().currentUser?.displayName;

    const newUser: User = {
      email: authUser.user.email,
      userName: displayNameFirebase ?? 'None',
    };

    return newUser;
  },
);
