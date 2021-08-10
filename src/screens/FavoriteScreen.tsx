import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Movie} from 'src/models';
import Favorite from 'src/components/favorite/Favorite';

const FavoriteScreen: React.FC = () => {
  const [backendMovies, setBackendMovies] = useState<Movie[]>([]);

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
          const data: Movie[] = snap.docs.map(doc => ({
            id: parseInt(doc.id, 10),
            posterPath: doc.data().posterPath,
            contentType: doc.data().contentType,
          }));
          setBackendMovies(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return <Favorite movies={backendMovies} />;
};

export default FavoriteScreen;
