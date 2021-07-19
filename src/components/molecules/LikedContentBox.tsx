import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import MovieBox from '../atoms/MovieBox';
import SectionHeader from '../atoms/SectionHeader';

const LikedContentBox = () => {
  return (
    <ScrollView
      style={styles.likedWrapper}
      showsVerticalScrollIndicator={false}>
      <SectionHeader text="Liked" color="white" />
      <View style={styles.likedContentBox}>
        {/* missing props  */}
        <MovieBox />
        <MovieBox />
        <MovieBox />
        <MovieBox />
        <MovieBox />
        <MovieBox />
        <MovieBox />
        <MovieBox />
        <MovieBox />
        <MovieBox />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  likedWrapper: {
    marginTop: 50,
  },
  likedContentBox: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default LikedContentBox;
