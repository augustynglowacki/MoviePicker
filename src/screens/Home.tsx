import {API_KEY} from '@env';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import MovieList from '../components/organisms/MovieList';
import axiosInstance from '../helpers/axiosInstance';
import {Movie, MovieAxiosResponse, MovieState} from '../models';
import {AUTH, DETAILS} from '../models/constants/routeNames';
import {fetchMovies} from '../redux/action';

const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state: MovieState) => state.movies);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await axiosInstance.get<MovieAxiosResponse>(
          `movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
        );
        const newresult = res.data.results.map((x: Movie) => ({
          id: x.id,
          title: x.title,
          vote_average: x.vote_average,
          poster_path: x.poster_path,
          overview: x.overview,
        }));
        console.log(newresult);
        dispatch(fetchMovies(newresult));
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
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
          <MovieList moviesList={movies} />
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
