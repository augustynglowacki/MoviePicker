import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import ErrorBox from '../components/atoms/ErrorBox';
import MovieList from '../components/organisms/MovieList';
import {AUTH, DETAILS} from '../models/constants/routeNames';
import {getMoviesStarted} from '../redux/movies/moviesActions';
import {AppState} from '../redux/store';
import Loading from './Loading';

const Home = () => {
  const dispatch = useDispatch();
  const {movies, error, loading} = useSelector(
    (state: AppState) => state.moviesReducer,
  );

  useEffect(() => {
    dispatch(getMoviesStarted());
  }, [dispatch]);

  const {navigate} = useNavigation();
  const doubleTapRef = useRef();
  const isLogIn = false; //temporary state

  const navigateTo = () => {
    navigate(AUTH);
  };

  const handleOnActivated = () => {
    if (isLogIn) {
      //  TODO:
      console.log('add function to like');
    }
    if (!isLogIn) {
      Alert.alert('Login ', 'Do you want to login to add to favorite?', [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {
          text: 'OK',
          onPress: navigateTo,
        },
      ]);
    }
  };

  return (
    <TapGestureHandler
      waitFor={doubleTapRef}
      onActivated={() => {
        navigate(DETAILS);
      }}>
      <TapGestureHandler
        maxDelayMs={250}
        ref={doubleTapRef}
        numberOfTaps={2}
        onActivated={handleOnActivated}>
        <View style={styles.wrapper}>
          {loading ? (
            <Loading />
          ) : error ? (
            <ErrorBox />
          ) : (
            <MovieList moviesList={movies} />
          )}
        </View>
      </TapGestureHandler>
    </TapGestureHandler>
  );
};

export default Home;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'blue',
  },
});
