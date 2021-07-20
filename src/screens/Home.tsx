import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import MovieList from '../components/organisms/MovieList';
import {getMovies, movieSelector} from '../redux/movie/MovieSlice';
import {useDispatch, useSelector} from 'react-redux';
import ScreenWrapper from './ScreenWrapper';
import {genresSelector} from '../redux/genres/GenresSlice';
import {getGenres} from '../redux/genres/GenresSlice';

const Home = () => {
  const dispatch = useDispatch();
  //To select whatever elements we want from the state, we pass the state (exported as movieSelector) to our useSelector hook.
  const {movies, loading, error} = useSelector(movieSelector);
  const genres = useSelector(genresSelector);

  useEffect(() => {
    dispatch(getMovies());
    dispatch(getGenres());
  }, [dispatch]);

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
