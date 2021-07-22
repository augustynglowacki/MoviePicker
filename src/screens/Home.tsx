import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import MovieList from '../components/organisms/MovieList';
import {getMovies, movieSelector} from '../redux/movie/MovieSlice';
import {useDispatch, useSelector} from 'react-redux';
import ScreenWrapper from './ScreenWrapper';
import auth from '@react-native-firebase/auth';
import {genresSelector} from '../redux/genres/GenresSlice';
import {getGenres} from '../redux/genres/GenresSlice';
import {setActiveUser, userThunkSelector} from '../redux/userThunk/UserSlice';

const Home = () => {
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
      <View style={styles.wrapper}>
        <MovieList moviesList={movies} genres={genres.genres} />
      </View>
    </ScreenWrapper>
  );
};

export default Home;

//temporary styles
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'blue',
  },
});
