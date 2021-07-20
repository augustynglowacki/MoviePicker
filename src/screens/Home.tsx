import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import MovieList from '../components/organisms/MovieList';
import {getMovies, movieSelector} from '../redux/movie/MovieSlice';
import {useDispatch, useSelector} from 'react-redux';
import ScreenWrapper from './ScreenWrapper';

const Home = () => {
  const dispatch = useDispatch();
  //To select whatever elements we want from the state, we pass the state (exported as movieSelector) to our useSelector hook.
  const {movies, loading, error} = useSelector(movieSelector);
  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  return (
    <ScreenWrapper error={error} loading={loading}>
      <View style={styles.wrapper}>
        <MovieList moviesList={movies} />
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
