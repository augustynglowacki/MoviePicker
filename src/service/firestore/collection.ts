import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Movie} from 'src/models';

export const setData = async (movie: Movie) => {
  const {posterPath, id, contentType} = movie;
  const db = firestore();
  const userId = auth().currentUser?.uid;
  userId
    ? await db
        .collection('users')
        .doc(userId)
        .collection('favoriteMovies')
        .doc(id.toString())
        .set({
          posterPath,
          contentType,
        })
    : null;
};
