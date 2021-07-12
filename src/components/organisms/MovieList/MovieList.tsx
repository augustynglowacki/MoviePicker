import React from 'react';
import {StyleSheet, View, FlatList, Dimensions, Text} from 'react-native';
import MovieItem from '../../molecules/MovieCover/MovieItem';

interface IMovieListProps {
  moviesList: IRenderItemProps[];
}
interface IRenderItemProps {
  id: Number;
  title: String;
  vote_average: Number;
  poster_path: String;
  overview: String;
}

const MovieList = ({moviesList}: IMovieListProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>What's popular</Text>
      </View>
      <FlatList
        data={moviesList}
        renderItem={({item}) => <MovieItem {...item} />}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={Dimensions.get('window').height}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
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
    left: Dimensions.get('window').width / 2 - 55,
    top: Dimensions.get('window').width - 340,
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
