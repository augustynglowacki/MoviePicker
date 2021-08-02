import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet, ListRenderItem, FlatList} from 'react-native';
import colors from '../../assets/theme/colors';
import {Movie} from '../../models';
import {Container, MovieBox, SectionHeader} from '../common';

interface Props {
  movies: Movie[];
}

const renderItem: ListRenderItem<Movie> = ({item}) => <MovieBox movie={item} />;

const FavoriteContentBox = ({movies}: Props) => {
  const {t} = useTranslation();
  return (
    <Container flexStart withPadding disableScroll>
      <SectionHeader text={t('movies:favorite')} color={colors.white} />
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
