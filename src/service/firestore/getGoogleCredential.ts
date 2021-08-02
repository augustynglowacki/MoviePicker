import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '1049524813514-pg8k5nj0jgoh4ir1uj3vikflo6q0r44k.apps.googleusercontent.com',
  offlineAccess: true,
});

export const getGoogleCredencial = async () => {
  const {idToken} = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return googleCredential;
};
