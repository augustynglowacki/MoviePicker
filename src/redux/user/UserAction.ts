import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {DEFAULT_AVATAR, DEFAULT_COVER} from 'src/constants';
import {BackendUser, User} from 'src/models';
import {setCover} from 'src/service/firestore/collection';
import {fetchCover} from 'src/service/firestore/getData';
import {fetchAvatar} from 'src/service/storage/getAvatar';
import {putAvatar} from 'src/service/storage/putAvatar';

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

    const coverURL = await fetchCover(uid);

    if (!email || !displayName || !photoURL || !coverURL) {
      return rejectWithValue('Error');
    }

    return {
      id: uid,
      email,
      userName: displayName,
      avatar: photoURL,
      coverPhoto: coverURL,
    };
  },
);

export const updateUserPhoto = createAsyncThunk<string, string>(
  'auth/updatePhoto',
  async (newRes, {rejectWithValue}) => {
    await putAvatar(newRes);
    const photoURL = await fetchAvatar();
    if (photoURL) {
      auth().currentUser?.updateProfile({
        photoURL: photoURL,
      });
      return photoURL;
    }
    return rejectWithValue('dddd');
  },
);

export const updateUserEmail = createAsyncThunk<string, UpdateUser>(
  'auth/updateEmail',
  async ({email, password, newEmail, callback}, {rejectWithValue}) => {
    if (newEmail) {
      await auth().signInWithEmailAndPassword(email, password);
      await auth().currentUser?.updateEmail(newEmail);
      callback();
      return newEmail;
    }
    return rejectWithValue('Error occurred when trying to update email');
  },
);

export const updateUserPassword = createAsyncThunk<string, UpdateUser>(
  'auth/updatePassword',
  async ({email, password, newPassword, callback}, {rejectWithValue}) => {
    if (newPassword) {
      await auth().signInWithEmailAndPassword(email, password);
      await auth().currentUser?.updatePassword(newPassword);
      callback();
      return newPassword;
    }
    return rejectWithValue('Error occurred when trying to update password');
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
      photoURL: DEFAULT_AVATAR,
    });

    const displayNameFirebase = auth().currentUser?.displayName;
    const photoURLFirebase = auth().currentUser?.photoURL;
    const {uid, email} = user;

    setCover(DEFAULT_COVER, uid);
    if (!email || !displayNameFirebase || !photoURLFirebase) {
      return rejectWithValue('Error');
    }

    return {
      id: uid,
      email,
      userName: displayNameFirebase,
      avatar: photoURLFirebase,
      coverPhoto: DEFAULT_COVER,
    };
  },
);

export const signInWithGoogle = createAsyncThunk<
  User,
  FirebaseAuthTypes.AuthCredential
>('auth/signInWithGoogle', async (googleCredential, {rejectWithValue}) => {
  const {
    user: {uid, email, displayName, photoURL},
  } = await auth().signInWithCredential(googleCredential);

  const coverURL = await fetchCover(uid);

  // if (!coverURL) {
  //   setCover(DEFAULT_COVER, uid);
  // }

  if (!email || !displayName || !photoURL || !coverURL) {
    return rejectWithValue('Error');
  }
  return {
    id: uid,
    email,
    userName: displayName,
    avatar: photoURL,
    coverPhoto: coverURL,
  };
});
