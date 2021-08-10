import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Movie} from 'src/models';

export const setData = (movie: Movie) => {
  const {posterPath, overview, title, id, voteAverage, genres, contentType} =
    movie;
  const db = firestore();
  const userId = auth().currentUser?.uid;
  userId
    ? db
        .collection('users')
        .doc(userId)
        .collection('favoriteMovies')
        .doc(id.toString())
        .set({
          title,
          voteAverage,
          posterPath,
          overview,
          genres,
          contentType,
        })
    : null;
};
