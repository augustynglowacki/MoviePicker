import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {BackendUser} from '../../models';
import {User} from './UserSlice';

interface LoginUser {
  email: string;
  password: string;
}

GoogleSignin.configure({
  webClientId:
    '1049524813514-pg8k5nj0jgoh4ir1uj3vikflo6q0r44k.apps.googleusercontent.com',
  offlineAccess: true,
});

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

export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const response = await auth().signInWithCredential(googleCredential);
    // console.log(response.user);
    const newUser: User = {
      email: response.user.email,
      userName: response.user.displayName,
    };
    return newUser;
  },
);
