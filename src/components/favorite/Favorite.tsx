import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet, ListRenderItem, FlatList} from 'react-native';
import {Movie} from 'src/models';
import palette from 'src/styles/palette';
import {Container, MovieBox, SectionHeader} from '../common';

interface Props {
  movies: Movie[];
  isExplore?: boolean;
}

const Favorite: React.FC<Props> = ({movies, isExplore}) => {
  const {t} = useTranslation('movies');

  const keyExtractor = (item: Movie) => item.id.toString();

  const renderItem: ListRenderItem<Movie> = ({item}) => (
    <MovieBox movie={item} />
  );

  return (
    <Container flexStart padding="small" disableScroll style={styles.wrapper}>
      <SectionHeader text={t('favorite')} color={palette.white} />
      <View style={styles.favorite}>
        <FlatList
          scrollEnabled={!isExplore}
          data={movies}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          maxToRenderPerBatch={5}
          columnWrapperStyle={styles.tagView}
          keyExtractor={keyExtractor}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  favorite: {
    minWidth: '100%',
    alignItems: 'center',
  },
  tagView: {
    flexWrap: 'wrap',
  },
  wrapper: {backgroundColor: palette.strongBlack},
});

export default Favorite;
