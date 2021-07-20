import {useNavigation} from '@react-navigation/native';
import {Observer} from 'mobx-react-lite';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import MovieList from '../components/organisms/MovieList';
import {useMoviesStore} from '../mobx/movies/MoviesContext';
import {AUTH, DETAILS} from '../models/constants/routeNames';

const Home = () => {
  const moviesStore = useMoviesStore();
  useEffect(() => {
    moviesStore.load();
  }, [moviesStore]);

  //navigation
  const {navigate} = useNavigation();
  const doubleTapRef = useRef();
  const isLogIn = false; //temprary state

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
  const renderFn = () => {
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
            <MovieList moviesList={moviesStore.movies} />
          </View>
        </TapGestureHandler>
      </TapGestureHandler>
    );
  };
  return <Observer>{renderFn}</Observer>;
};

export default Home;

//temporary styles
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'blue',
  },
});
