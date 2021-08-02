import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {BackendEntity, Movie} from 'src/models';
import FavoriteContentBox from 'src/components/favorite/FavoriteContentBox';

const Favorite: React.FC = () => {
  const [backendMovies, setBackendMovies] = useState<BackendEntity[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userId = auth().currentUser?.uid ?? 'none';
      const db = firestore(); //create service for firebase
      db.collection('users')
        .doc(userId)
        .collection('favoriteMovies')
        .onSnapshot(snap => {
          const newww = snap.docs.map(doc => ({
            // nice
            id: doc.id,
            movieId: doc.data().movieId,
            title: doc.data().title,
            vote_average: doc.data().number,
            poster_path: doc.data().poster_path,
            overview: doc.data().overview,
            genre_ids: doc.data().genre_ids,
            isMovie: doc.data().isMovie,
          }));
          setBackendMovies(newww);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const convertEntityToMovie = (data: BackendEntity[]) => {
    const newResult: Movie[] = data.map((movie: BackendEntity) => ({
      //shitty name
      id: movie.movieId,
      title: movie.title,
      vote_average: movie.vote_average,
      poster_path: movie.poster_path,
      overview: movie.overview,
      genre_ids: movie.genre_ids,
      isMovie: movie.isMovie,
    }));
    return newResult;
  };

  return <FavoriteContentBox movies={convertEntityToMovie(backendMovies)} />;
};

export default Favorite;
