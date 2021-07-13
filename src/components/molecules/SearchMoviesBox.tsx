import React from 'react';
import {View, ScrollView} from 'react-native';
import MovieBox from '../atoms/MovieBox';
import SectionHeader from '../atoms/SectionHeader';

const SearchMoviesBox = () => {
  return (
    <View>
      <SectionHeader text="Movies" size={16} />
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

export default SearchMoviesBox;
