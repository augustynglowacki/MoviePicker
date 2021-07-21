import {API_IMAGES} from '@env';
import {useNavigation} from '@react-navigation/native';
import {DETAILS} from '../../models/constants/routeNames';
import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import colors from '../../assets/theme/colors';
import {Movie} from '../../models';

interface MovieBoxProps {
  movie: Movie;
}

const MovieBox = ({movie}: MovieBoxProps) => {
  const {navigate} = useNavigation();
  return (
    <>
      {!!movie.poster_path && (
        <TapGestureHandler
          onActivated={() => {
            navigate(DETAILS, {
              poster_path: movie.poster_path,
              overview: movie.overview,
              title: movie.title,
              id: movie.id,
            });
          }}>
          <View style={styles.movieBox}>
            <ImageBackground
              source={{uri: `${API_IMAGES}${movie.poster_path}`}}
              style={styles.movieImage}
            />
          </View>
        </TapGestureHandler>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  movieBox: {
    width: 180,
    height: 250,
    flexBasis: '45%',
    margin: 3,
    backgroundColor: colors.black,
  },
  movieImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
});

export default MovieBox;
