import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Text,
  ListRenderItem,
} from 'react-native';
import colors from '../../assets/theme/colors';
import {Movie} from '../../models';
import {Genres} from '../../models/Genres';
import MovieItem from '../molecules/MovieItem';

interface MovieListProps {
  moviesList: Movie[];
  genres: Genres[];
}

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const MovieList = ({moviesList, genres}: MovieListProps) => {
  const {t} = useTranslation();
  const renderItem: ListRenderItem<Movie> = ({item}) => {
    const mergeGenresWithMovies = item.genre_ids.map(movie =>
      genres.find(genre => genre.id === movie),
    );

    return (
      <MovieItem movie={item} mergeGenresWithMovies={mergeGenresWithMovies} />
    );
  };

  const keyExtractor = (item: Movie) => item.id.toString();

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>{t('movies:popular')}</Text>
      </View>
      <FlatList<Movie>
        data={moviesList}
        renderItem={renderItem}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={HEIGHT}
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
    backgroundColor: colors.white,
  },
  heading: {
    justifyContent: 'center',
    alignItems: 'center',
    left: WIDTH / 2 - 55,
    top: WIDTH - 340,
    position: 'absolute',
    zIndex: 10,
  },
  headingText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default MovieList;
