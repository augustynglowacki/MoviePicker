import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {CollectionItem, Movie} from 'src/models';
import Favorite from 'src/components/favorite/Favorite';

const FavoriteScreen: React.FC = () => {
  const [backendMovies, setBackendMovies] = useState<CollectionItem[]>([]);

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
          const data: CollectionItem[] = snap.docs.map(doc => ({
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

  const convertEntityToMovie = (data: CollectionItem[]): Movie[] => {
    return data.map((movie: CollectionItem) => ({
      id: movie.movieId,
      title: movie.title,
      voteAverage: movie.voteAverage,
      posterPath: movie.posterPath,
      overview: movie.overview,
      genres: movie.genres,
      contentType: movie.contentType,
    }));
  };

  return <Favorite movies={convertEntityToMovie(backendMovies)} />;
};

export default FavoriteScreen;
