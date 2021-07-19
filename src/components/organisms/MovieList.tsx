import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Text,
  ListRenderItem,
} from 'react-native';
import {MovieListProps, Movie} from '../../models';
import MovieItem from '../molecules/MovieItem';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const MovieList = ({moviesList}: MovieListProps) => {
  const renderItem: ListRenderItem<Movie> = ({item}) => (
    <MovieItem
      id={item.id}
      title={item.title}
      overview={item.overview}
      poster_path={item.poster_path}
      vote_average={item.vote_average}
    />
  );

  const keyExtractor = (item: Movie) => item.id.toString();

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>What's popular</Text>
      </View>
      <FlatList<Movie>
        data={moviesList}
        renderItem={renderItem}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={HEIGHT}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default MovieList;
