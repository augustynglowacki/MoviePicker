import React, {useEffect} from 'react';
import MovieList from '../components/popular/MovieList';
import {getMovies, movieSelector} from '../redux/movie/MovieSlice';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {genresSelector} from '../redux/genres/GenresSlice';
import {getGenres} from '../redux/genres/GenresSlice';
import {setActiveUser, userThunkSelector} from '../redux/user/UserSlice';
import {Container, ScreenWrapper} from '../components/common';

const Popular = () => {
  const dispatch = useDispatch();
  //To select whatever elements we want from the state, we pass the state (exported as movieSelector) to our useSelector hook.
  const {movies, loading, error} = useSelector(movieSelector);
  const genres = useSelector(genresSelector);

  useEffect(() => {
    dispatch(getMovies());
    dispatch(getGenres());
  }, [dispatch]);

  const {
    user: {email},
  } = useSelector(userThunkSelector);

  useEffect(() => {
    if (email === '') {
      const subscriber = auth().onAuthStateChanged(user => {
        if (user) {
          dispatch(
            setActiveUser({
              email: user.email,
              userName: user.displayName,
            }),
          );
        }
      });
      return subscriber;
    }
  }, [dispatch, email]);

  return (
    <ScreenWrapper error={error} loading={loading}>
      <Container disableScroll disableSafeArea>
        <MovieList moviesList={movies} genres={genres.genres} />
      </Container>
    </ScreenWrapper>
  );
};

export default Popular;
