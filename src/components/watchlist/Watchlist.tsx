import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet, ListRenderItem, FlatList} from 'react-native';
import Animated, {AnimatedLayout, FlipInXDown} from 'react-native-reanimated';
import {BOTTOM_TABS_HEIGHT} from 'src/constants';
import {Movie} from 'src/models';
import palette from 'src/styles/palette';
import {Container, CollectionItem} from '../common';
import ScreenHeader from '../common/ScreenHeader';

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
      <AnimatedLayout>
        <Animated.View entering={FlipInXDown.springify()}>
          <ScreenHeader label={t('watchlist')} />
        </Animated.View>
      </AnimatedLayout>
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
});

export default Watchlist;
