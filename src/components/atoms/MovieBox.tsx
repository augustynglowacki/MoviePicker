import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import colors from '../../assets/theme/colors';

interface MovieBoxProps {
  title: string;
  poster_path: string;
}

const MovieBox = ({poster_path, title}: MovieBoxProps) => {
  return (
    <View style={styles.movieBox}>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  movieBox: {
    width: 180,
    height: 250,
    margin: 3,
    backgroundColor: colors.primary,
  },
  movieImage: {},
});

export default MovieBox;
