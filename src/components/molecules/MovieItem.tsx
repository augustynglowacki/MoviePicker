import React from 'react';
import {Text, View, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {API_IMAGES} from '@env';
import {Movie} from '../../models';
import {StyleSheet, Dimensions} from 'react-native';

const WINDOW_HEIGHT = Dimensions.get('window').height;

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
        colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.4)']}
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        style={styles.linearGradient}
      />
      <View style={styles.contentContainer}>
        <View style={styles.titles}>
          <Text style={styles.title}>{title}</Text>

          <View style={styles.subtitle}>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryItem}>Action</Text>
            </View>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryItem}>Kids</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MovieItem;
export const styles = StyleSheet.create({
  movieContainer: {
    width: '100%',
    height: WINDOW_HEIGHT,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    height: 300,
    bottom: WINDOW_HEIGHT - 950,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titles: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontWeight: '800',
    fontSize: 42,
    marginBottom: 15,
    color: '#ffff',
    textAlign: 'center',
  },
  subtitle: {
    maxWidth: 300,
    fontSize: 14,
    letterSpacing: 0.76,
    lineHeight: 21,
    color: '#ffff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryContainer: {
    marginRight: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 2,
    backgroundColor: 'white',
  },
  categoryItem: {
    color: '#181818',
    fontWeight: '600',
    fontSize: 13,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  linearGradient: {
    height: '100%',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
