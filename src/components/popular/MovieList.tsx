import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View, FlatList, Text, ListRenderItem} from 'react-native';
import palette from 'src/styles/palette';
import {Movie} from 'src/models';
import MovieItem from './MovieItem';
import {BOTTOM_TABS_HEIGHT, WINDOW_HEIGHT} from 'src/constants';

interface Props {
  moviesList: Movie[];
}

const MovieList: React.FC<Props> = ({moviesList}) => {
  const {t} = useTranslation('movies');
  const renderItem: ListRenderItem<Movie> = ({item}) => {
    return <MovieItem movie={item} />;
  };

  const keyExtractor = (item: Movie) => item.id.toString();

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>{t('popular')}</Text>
      </View>
      <FlatList<Movie>
        data={moviesList}
        renderItem={renderItem}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={WINDOW_HEIGHT - BOTTOM_TABS_HEIGHT}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        initialNumToRender={7}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.black,
  },
  heading: {
    alignSelf: 'center',
    top: 40,
    position: 'absolute',
    zIndex: 10,
  },
  headingText: {
    color: palette.white,
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default MovieList;
