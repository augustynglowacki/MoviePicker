import storage from '@react-native-firebase/storage';

interface Props {
  picture: string;
  path: string;
  userID: string;
}

export const saveToFirestore = async ({picture, userID, path}: Props) => {
  await storage().ref(`/users/${userID}/${path}.jpg`).putFile(picture);
};
