import React, {useEffect} from 'react';
import MovieList from 'src/components/popular/MovieList';
import {getMovies, movieSelector} from 'src/redux/movie/MovieSlice';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {genresSelector} from 'src/redux/genres/GenresSlice';
import {getGenres} from 'src/redux/genres/GenresSlice';
import {setActiveUser, userThunkSelector} from 'src/redux/user/UserSlice';
import {Container, ErrorWrapper} from 'src/components/common';

const Popular: React.FC = () => {
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
      //u know what
      const subscriber = auth().onAuthStateChanged(user => {
        //ts + move into service
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
    <ErrorWrapper error={error} loading={loading}>
      <Container disableScroll disableSafeArea>
        <MovieList moviesList={movies} genres={genres.genres} />
      </Container>
    </ErrorWrapper>
  );
};

export default Popular;
