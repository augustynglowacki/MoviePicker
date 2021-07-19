import React, {useRef} from 'react';
import {Text, View, ImageBackground, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {API_IMAGES} from '@env';
import {Movie} from '../../models';
import {StyleSheet, Dimensions} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {AUTH, DETAILS} from '../../models/constants/routeNames';

const MovieItem = ({
  //id,
  poster_path,
  overview,
  title,
}: // vote_average,
Movie) => {
  const {navigate} = useNavigation();
  const doubleTapRef = useRef();
  const isLogIn = false; //temprary state
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
          onPress: () => navigate(AUTH),
        },
      ]);
    }
  };
  return (
    <TapGestureHandler
      waitFor={doubleTapRef}
      onActivated={() => {
        navigate(DETAILS, {title});
      }}>
      <TapGestureHandler
        maxDelayMs={250}
        ref={doubleTapRef}
        numberOfTaps={2}
        onActivated={handleOnActivated}>
        <View style={styles.movieContainer}>
          <ImageBackground
            source={{uri: `${API_IMAGES}${poster_path}`}}
            style={styles.image}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0)']}
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}
            style={styles.linearGradient}
          />
          <View style={styles.contentContainer}>
            <View style={styles.titles}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{overview}</Text>
            </View>
          </View>
        </View>
      </TapGestureHandler>
    </TapGestureHandler>
  );
};

export default MovieItem;

export const styles = StyleSheet.create({
  movieContainer: {
    width: '100%',
    height: Dimensions.get('window').height,
    position: 'relative',
  },
  contentContainer: {
    justifyContent: 'space-between',
    width: '100%',
    height: ' 100%',
    paddingVertical: 50,
    marginTop: '120%',
  },
  titles: {
    marginBottom: 120,
    padding: 20,
  },
  title: {
    fontWeight: '800',
    fontSize: 36,
    marginBottom: 15,
    color: '#ffff',
  },
  subtitle: {
    maxWidth: 300,
    fontSize: 14,
    letterSpacing: 0.76,
    lineHeight: 21,
    color: '#ffff',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  linearGradient: {
    height: 500,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
