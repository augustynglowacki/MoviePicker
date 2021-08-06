import {API_IMAGES} from '@env';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, ImageBackground, Animated} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import palette from 'src/styles/palette';
import LinearGradient from 'react-native-linear-gradient';
import {Dimensions} from 'react-native';
import {Movie} from 'src/models';
import {Route} from 'src/constants';

interface Props {
  movie: Movie;
}

const MovieBox: React.FC<Props> = ({movie}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const {navigate} = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  if (!movie.posterPath) {
    return null;
  }
  return (
    <TapGestureHandler
      onActivated={() => {
        navigate(Route.DETAILS, {
          posterPath: movie.posterPath,
          id: movie.id,
          contentType: movie.contentType,
        });
      }}>
      <Animated.View style={{...styles.movieBox, opacity: fadeAnim}}>
        <ImageBackground
          source={{uri: `${API_IMAGES}${movie.posterPath}`}}
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
    backgroundColor: palette.black,
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
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderRadius: BORDER_RADIUS,
  },
});

export default MovieBox;
