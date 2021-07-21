import auth from '@react-native-firebase/auth';
import {BackendUser} from '../../models';
import {setUserLogOutState} from './UserSlice';

interface LoginUser {
  email: string;
  password: string;
}

export const createUser = ({email, password, displayName}: BackendUser) => {
  return async () => {
    try {
      const authUser = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const updateProfile = await authUser.user.updateProfile({
        displayName: displayName,
      });
      console.log(updateProfile);
      console.log('User account created & signed in!');
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
  return async () => {
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      console.log('you are log in:', response);
    } catch (error) {
      console.log(error);
    }
  };
};

export const logoutUser = () => {
  return (dispatch: any) => {
    auth()
      .signOut()
      .then(() => {
        dispatch(setUserLogOutState());
      });
  };
};
