import React from 'react';
import {Text, View, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './MovieItemStyles';
import {API_IMAGES} from '@env';
import {IMovie} from '../../../models/models';

const MovieItem = ({
  //id,
  poster_path,
  overview,
  title,
}: // vote_average,
IMovie) => {
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
