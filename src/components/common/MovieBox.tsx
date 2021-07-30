import {API_IMAGES} from '@env';
import {useNavigation} from '@react-navigation/native';
import {DETAILS} from '../../models/constants/routeNames';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, ImageBackground, Animated} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import colors from '../../assets/theme/colors';
import {Movie} from '../../models';
import LinearGradient from 'react-native-linear-gradient';
import {Dimensions} from 'react-native';

interface MovieBoxProps {
  movie: Movie;
}

const MovieBox = ({movie}: MovieBoxProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const {navigate} = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <>
      {/* create if guard above */}
      {!!movie.poster_path && (
        <TapGestureHandler
          onActivated={() => {
            navigate(DETAILS, {
              poster_path: movie.poster_path,
              overview: movie.overview,
              title: movie.title,
              id: movie.id,
              isMovie: movie.isMovie,
            });
          }}>
          <Animated.View style={{...styles.movieBox, opacity: fadeAnim}}>
            <ImageBackground
              source={{uri: `${API_IMAGES}${movie.poster_path}`}}
              style={styles.movieImage}
            />
            <LinearGradient
              colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.1)']}
              start={{x: 0, y: 1}}
              end={{x: 0, y: 0}}
              style={styles.linearGradient}
            />
          </Animated.View>
        </TapGestureHandler>
      )}
    </>
  );
};
const WIDTH = Dimensions.get('window').width / 2 - 22;
const HEIGHT = (WIDTH / 2) * 3;
const BORDER_RADIUS = 4;
const styles = StyleSheet.create({
  movieBox: {
    height: HEIGHT,
    minWidth: WIDTH,
    margin: 3,
    backgroundColor: colors.black,
    borderRadius: BORDER_RADIUS,
  },
  movieImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
  },
  linearGradient: {
    height: '100%',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderRadius: BORDER_RADIUS,
  },
});

export default MovieBox;
