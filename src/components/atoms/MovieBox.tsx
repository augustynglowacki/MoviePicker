import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

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
    backgroundColor: 'red',
  },
  movieImage: {},
});

export default MovieBox;
