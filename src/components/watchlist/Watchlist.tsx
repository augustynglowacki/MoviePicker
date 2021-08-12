import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet, ListRenderItem, FlatList, Text} from 'react-native';
import {BOTTOM_TABS_HEIGHT} from 'src/constants';
import {Movie} from 'src/models';
import palette from 'src/styles/palette';
import {Container, CollectionItem} from '../common';

interface Props {
  movies: Movie[];
  isExplore?: boolean;
}

const Watchlist: React.FC<Props> = ({movies, isExplore}) => {
  const {t} = useTranslation('movies');

  const keyExtractor = (item: Movie) => item.id.toString();

  const renderItem: ListRenderItem<Movie> = ({item}) => (
    <CollectionItem movie={item} />
  );

  return (
    <Container flexStart padding="small" disableScroll style={styles.wrapper}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>{t('watchlist')}</Text>
      </View>
      <View style={styles.watchlist}>
        <FlatList
          scrollEnabled={!isExplore}
          data={movies}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          maxToRenderPerBatch={7}
          columnWrapperStyle={styles.tagView}
          keyExtractor={keyExtractor}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  watchlist: {
    minWidth: '100%',
    alignItems: 'center',
    flexGrow: 1,
    height: '103%',
  },
  tagView: {
    flexWrap: 'wrap',
  },
  wrapper: {
    backgroundColor: palette.strongBlack,
    paddingBottom: BOTTOM_TABS_HEIGHT,
  },
  heading: {
    alignSelf: 'center',
    marginTop: 10,
    paddingBottom: 16,
  },
  headingText: {
    color: palette.white,
    fontWeight: 'bold',
    fontSize: 17,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Watchlist;
