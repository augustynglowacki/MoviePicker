import React from 'react';
import {
  View,
  StyleSheet,
  ListRenderItem,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../../assets/theme/colors';
import {Movie} from '../../models';
import {movieSelector} from '../../redux/movie/MovieSlice';
import MovieBox from '../atoms/MovieBox';
import SectionHeader from '../atoms/SectionHeader';

const renderItem: ListRenderItem<Movie> = ({item}) => <MovieBox movie={item} />;

const LikedContentBox = () => {
  const {movies} = useSelector(movieSelector); // temporary
  return (
    <SafeAreaView style={styles.likedWrapper}>
      <SectionHeader text="Liked" color={colors.white} />
      <View style={styles.likedContentBox}>
        <FlatList
          data={movies}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          maxToRenderPerBatch={5}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  likedWrapper: {
    marginTop: 50,
  },
  likedContentBox: {
    width: '100%',
    justifyContent: 'center',
    paddingBottom: 70,
  },
});

export default LikedContentBox;
