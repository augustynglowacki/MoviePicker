import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const MovieBox = () => {
  return (
    <View style={styles.movieBox}>
      <Text>test</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  movieBox: {
    width: 180,
    height: 200,
    margin: 3,
    backgroundColor: 'red',
  },
  movieImage: {},
});

export default MovieBox;
