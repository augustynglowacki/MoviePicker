import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {BackendUser} from '../../models';
import {User} from './UserSlice';

interface LoginUser {
  email: string;
  password: string;
}

interface UpdateUser {
  email: string;
  newEmail?: string;
  password: string;
  newPassword?: string;
  callback: () => void;
}

export const signInWithEmailAndPassword = createAsyncThunk<User, LoginUser>(
  'auth/signIn',
  async ({email: loginEmail, password}, {rejectWithValue}) => {
    const {
      user: {uid, email, displayName, photoURL},
    } = await auth().signInWithEmailAndPassword(loginEmail, password);

    //TODO: set cover photo from firestore

    if (!email || !displayName || !photoURL) {
      return rejectWithValue('Error');
    }
    const newUser: User = {
      id: uid,
      email,
      userName: displayName,
      avatar: photoURL,
      coverPhoto:
        'https://firebasestorage.googleapis.com/v0/b/moviepicker-2405b.appspot.com/o/users%2Fdefault%2FdefaultBackground.jpg?alt=media&token=2194f500-dc89-40e4-bc4c-97a4c3f62d82',
    };
    return newUser;
  },
);

export const updateEmail = createAsyncThunk<string, UpdateUser>(
  'auth/updateEmail',
  async ({email, password, newEmail, callback}, {rejectWithValue}) => {
    if (newEmail) {
      await auth().signInWithEmailAndPassword(email, password);
      await auth().currentUser?.updateEmail(newEmail);
      callback();
      return newEmail;
    }
    return rejectWithValue('Error');
  },
);

export const logOutUser = createAsyncThunk(
  'auth/logOut',
  async () => await auth().signOut(),
);

export const createUserWithEmailAndPassword = createAsyncThunk<
  User,
  BackendUser
>(
  'auth/register',
  async ({email: registerEmail, password, displayName}, {rejectWithValue}) => {
    const {user} = await auth().createUserWithEmailAndPassword(
      registerEmail,
      password,
    );

    await user.updateProfile({
      displayName: displayName,
      photoURL:
        'https://firebasestorage.googleapis.com/v0/b/moviepicker-2405b.appspot.com/o/users%2Fdefault%2FdefaultProfile.jpeg?alt=media&token=bc972054-6f70-4339-a72d-4a6c89be93a2',
    });

    const displayNameFirebase = auth().currentUser?.displayName;
    const photoURLFirebase = auth().currentUser?.photoURL;

    //TODO: save user path to firestore with photo and cover

    const {uid, email} = user;
    if (!uid || !email || !displayNameFirebase || !photoURLFirebase) {
      return rejectWithValue('Error');
    }

    const newUser: User = {
      id: uid,
      email,
      userName: displayNameFirebase,
      avatar: photoURLFirebase,
      coverPhoto:
        'https://firebasestorage.googleapis.com/v0/b/moviepicker-2405b.appspot.com/o/users%2Fdefault%2FdefaultBackground.jpg?alt=media&token=2194f500-dc89-40e4-bc4c-97a4c3f62d82',
    };

    return newUser;
  },
);

export const signInWithGoogle = createAsyncThunk<
  User,
  FirebaseAuthTypes.AuthCredential
>('auth/signInWithGoogle', async (googleCredential, {rejectWithValue}) => {
  const {
    user: {uid, email, displayName, photoURL},
  } = await auth().signInWithCredential(googleCredential);

  //TODO: save user path to firestore with photo and cover

  if (!email || !displayName || !photoURL) {
    return rejectWithValue('Error');
  }
  const newUser: User = {
    id: uid,
    email,
    userName: displayName,
    avatar: photoURL,
    coverPhoto:
      'https://firebasestorage.googleapis.com/v0/b/moviepicker-2405b.appspot.com/o/users%2Fdefault%2FdefaultBackground.jpg?alt=media&token=2194f500-dc89-40e4-bc4c-97a4c3f62d82',
  };
  return newUser;
});
