import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet, ListRenderItem, FlatList} from 'react-native';
import {Movie} from 'src/models';
import palette from 'src/styles/palette';
import {Container, MovieBox, SectionHeader} from '../common';

interface Props {
  movies: Movie[];
}

const FavoriteContentBox: React.FC<Props> = ({movies}) => {
  const {t} = useTranslation('movies');

  const renderItem: ListRenderItem<Movie> = ({item}) => (
    <MovieBox movie={item} />
  );
  return (
    <Container flexStart withPadding disableScroll>
      <SectionHeader text={t('liked')} color={palette.white} />
      <View style={styles.favoriteContentBox}>
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
  favoriteContentBox: {
    minWidth: '100%',
    alignItems: 'center',
    paddingBottom: '12%',
  },
  tagView: {
    flexWrap: 'wrap',
  },
});

export default FavoriteContentBox;
