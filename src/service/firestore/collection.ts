import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Movie} from 'src/models';

export const setData = async (movie: Movie, name: string) => {
  const {posterPath, id, contentType} = movie;
  const db = firestore();
  const userId = auth().currentUser?.uid;

  if (!userId) {
    return null;
  }
  const docRef = db
    .collection('users')
    .doc(userId)
    .collection(name)
    .doc(id.toString());

  const doc = await docRef.get();

  if (doc.exists) {
    docRef.delete();
  }
  if (!doc.exists) {
    docRef.set({
      posterPath,
      contentType,
    });
  }
};

export const setCover = (coverURL: string, userId: string) => {
  const db = firestore();
  db.collection('users').doc(userId).set({coverURL});
};
