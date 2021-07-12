import React from 'react';
import {Text, View, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {API_IMAGES} from '@env';
import {Movie} from '../../models';
import {StyleSheet, Dimensions} from 'react-native';

const MovieItem = ({
  //id,
  poster_path,
  overview,
  title,
}: // vote_average,
Movie) => {
  return (
    <View style={styles.movieContainer}>
      <ImageBackground
        source={{uri: `${API_IMAGES}${poster_path}`}}
        style={styles.image}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0)']}
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        style={styles.linearGradient}
      />
      <View style={styles.contentContainer}>
        <View style={styles.titles}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{overview}</Text>
        </View>
      </View>
    </View>
  );
};

export default MovieItem;

export const styles = StyleSheet.create({
  movieContainer: {
    width: '100%',
    height: Dimensions.get('window').height,
    position: 'relative',
  },
  contentContainer: {
    justifyContent: 'space-between',
    width: '100%',
    height: ' 100%',
    paddingVertical: 50,
    marginTop: '120%',
  },
  titles: {
    marginBottom: 120,
    padding: 20,
  },
  title: {
    fontWeight: '800',
    fontSize: 36,
    marginBottom: 15,
    color: '#ffff',
  },
  subtitle: {
    maxWidth: 300,
    fontSize: 14,
    letterSpacing: 0.76,
    lineHeight: 21,
    color: '#ffff',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  linearGradient: {
    height: 500,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
