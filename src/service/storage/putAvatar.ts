import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

export const putAvatar = async (newRes: string) => {
  await storage()
    .ref('users/' + auth().currentUser?.uid + '/profile.jpg')
    .putFile(newRes);
};
