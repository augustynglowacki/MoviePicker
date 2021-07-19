import React from 'react';
import {StyleSheet, View} from 'react-native';
import ActorsBox from '../components/molecules/ActorsBox';
import SearchBox from '../components/molecules/SearchBox';
import SearchMoviesBox from '../components/molecules/SearchMoviesBox';

const Discover = () => {
  return (
    <View style={styles.wrapper}>
      <SearchBox />
      <SearchMoviesBox />
      <ActorsBox />
    </View>
  );
};

export default Discover;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'black',
  },
});
