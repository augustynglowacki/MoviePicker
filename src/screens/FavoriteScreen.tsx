import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {BackendEntity, Movie} from 'src/models';
import FavoriteContentBox from 'src/components/favorite/FavoriteContentBox';

const FavoriteScreen: React.FC = () => {
  const [backendMovies, setBackendMovies] = useState<BackendEntity[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userId = auth().currentUser?.uid ?? 'none';
      const db = firestore();
      db.collection('users')
        .doc(userId)
        .collection('favoriteMovies')
        .onSnapshot(snap => {
          const data: BackendEntity[] = snap.docs.map(doc => ({
            id: doc.id,
            movieId: doc.data().movieId,
            title: doc.data().title,
            voteAverage: doc.data().voteAverage,
            posterPath: doc.data().posterPath,
            overview: doc.data().overview,
            genres: doc.data().genres,
            contentType: doc.data().contentType,
          }));
          setBackendMovies(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const convertEntityToMovie = (data: BackendEntity[]): Movie[] => {
    return data.map((movie: BackendEntity) => ({
      id: movie.movieId,
      title: movie.title,
      voteAverage: movie.voteAverage,
      posterPath: movie.posterPath,
      overview: movie.overview,
      genres: movie.genres,
      contentType: movie.contentType,
    }));
  };

  return <FavoriteContentBox movies={convertEntityToMovie(backendMovies)} />;
};

export default FavoriteScreen;
