import storage from '@react-native-firebase/storage';

interface SaveToFirestoreProps {
  picture: string;
  path: string;
  userID: string;
}

export const saveToFirestore = async ({
  picture,
  userID,
  path,
}: SaveToFirestoreProps) => {
  await storage().ref(`/users/${userID}/${path}.jpg`).putFile(picture);
};
