import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

export const fetchAvatar = async () => {
  try {
    const userId = auth().currentUser?.uid;
    const photoURL = await storage()
      .ref(`/users/${userId}/profile.jpg`)
      .getDownloadURL();
    return photoURL;
  } catch (err) {
    console.log(err);
  }
};
