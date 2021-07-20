import {API_IMAGES} from '@env';
import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import colors from '../../assets/theme/colors';

interface MovieBoxProps {
  poster_path: string;
}

const MovieBox = ({poster_path}: MovieBoxProps) => {
  return (
    <>
      {!!poster_path && (
        <View style={styles.movieBox}>
          <ImageBackground
            source={{uri: `${API_IMAGES}${poster_path}`}}
            style={styles.movieImage}
          />
        </View>
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
    backgroundColor: colors.primary,
  },
  movieImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
});

export default MovieBox;
