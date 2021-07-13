import {API_KEY, API_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import MovieList from '../components/organisms/MovieList';
import {IMovie} from '../models';
import axios from 'axios';

const Home = () => {
  const {navigate} = useNavigation();
  const doubleTapRef = useRef();
  const isLogIn = false;

  // fetch needs to be separated

  const [moviesList, setMoviesList] = useState<Array<IMovie>>([
    {id: 0, title: 'none', vote_average: 0, poster_path: '', overview: ''},
  ]);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=2`)
      .then(res => {
        setMoviesList(res.data.results);
      })
      .catch(() => {
        setFetchError(true);
      });
  }, []);

  console.log(fetchError);

  return (
    <TapGestureHandler
      waitFor={doubleTapRef}
      onActivated={() => {
        navigate('Details');
      }}>
      <TapGestureHandler
        maxDelayMs={250}
        ref={doubleTapRef}
        numberOfTaps={2}
        onActivated={() => {
          isLogIn
            ? console.log('add function to like')
            : Alert.alert(
                'Login! ',
                'Do you want to login to add to favorite?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => {},
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      navigate('Auth');
                    },
                  },
                ],
              );
        }}>
        <View style={styles.wrapper}>
          <MovieList moviesList={moviesList} />
        </View>
      </TapGestureHandler>
    </TapGestureHandler>
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
