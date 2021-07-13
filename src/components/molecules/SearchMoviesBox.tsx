import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import MovieBox from '../atoms/MovieBox';
import SectionHeader from '../atoms/SectionHeader';

const SearchMoviesBox = () => {
  return (
    <View style={styles.moviesBox}>
      <SectionHeader text="Movies" size={20} color="white" />
      <ScrollView horizontal={true}>
        <MovieBox />
        <MovieBox />
        <MovieBox />
        <MovieBox />
        <MovieBox />
        <MovieBox />
        <MovieBox />
        <MovieBox />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  moviesBox: {
    marginTop: 20,
  },
});

export default SearchMoviesBox;
