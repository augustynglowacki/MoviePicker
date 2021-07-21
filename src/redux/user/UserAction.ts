import auth from '@react-native-firebase/auth';
import {Dispatch} from 'react';
import {BackendUser} from '../../models';
import {setActiveUser, setUserLogOutState} from './UserSlice';

interface LoginUser {
  email: string;
  password: string;
}

export const createUser = ({email, password, displayName}: BackendUser) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const authUser = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const updateProfile = await authUser.user.updateProfile({
        displayName: displayName,
      });

      console.log(updateProfile);
      const displayNameFirebase = await auth().currentUser?.displayName;
      dispatch(
        setActiveUser({
          email: authUser.user.email,
          userName: displayNameFirebase ?? 'None',
        }),
      );
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      console.error(error);
    }
  };
};

export const loginUser = ({email, password}: LoginUser) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      dispatch(
        setActiveUser({
          email: response.user.email,
          userName: response.user.displayName,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const logoutUser = () => {
  return (dispatch: Dispatch<any>) => {
    auth()
      .signOut()
      .then(() => {
        dispatch(setUserLogOutState());
      });
  };
};
