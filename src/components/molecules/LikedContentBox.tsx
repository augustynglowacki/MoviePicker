import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet, ListRenderItem, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../../assets/theme/colors';
import {Movie} from '../../models';
import {movieSelector} from '../../redux/movie/MovieSlice';
import MovieBox from '../atoms/MovieBox';
import SectionHeader from '../atoms/SectionHeader';

const renderItem: ListRenderItem<Movie> = ({item}) => <MovieBox movie={item} />;

const LikedContentBox = () => {
  const {t} = useTranslation();
  const {movies} = useSelector(movieSelector); // temporary
  return (
    <View style={styles.likedWrapper}>
      <SectionHeader text={t('movies:liked')} color={colors.white} />
      <View style={styles.likedContentBox}>
        <FlatList
          data={movies}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          maxToRenderPerBatch={5}
        />
      </View>
    </View>
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
