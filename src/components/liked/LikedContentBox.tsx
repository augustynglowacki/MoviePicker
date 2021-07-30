import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet, ListRenderItem, FlatList} from 'react-native';
import colors from '../../assets/theme/colors';
import {Movie} from '../../models';
import {Container, MovieBox, SectionHeader} from '../common';

interface LikedProps {
  movies: Movie[];
}

// why here ?
const renderItem: ListRenderItem<Movie> = ({item}) => <MovieBox movie={item} />;

const LikedContentBox = ({movies}: LikedProps) => {
  const {t} = useTranslation();
  return (
    <Container flexStart withPadding disableScroll>
      <SectionHeader text={t('movies:liked')} color={colors.white} />
      <View style={styles.likedContentBox}>
        <FlatList
          data={movies}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          maxToRenderPerBatch={5}
          columnWrapperStyle={styles.tagView}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  likedContentBox: {
    minWidth: '100%',
    alignItems: 'center',
    paddingBottom: '12%',
  },
  tagView: {
    flexWrap: 'wrap',
  },
});

export default LikedContentBox;
