import React from 'react';
import {Text, View, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './MovieItem.styles';

interface MovieItemProps {
  image: string;
  description: string;
  title: string;
}

const MovieItem: React.FC<MovieItemProps> = ({image, description, title}) => {
  return (
    <View style={styles.movieContainer}>
      <ImageBackground source={image} style={styles.image} />
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0)']}
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        style={styles.linearGradient}
      />
      <View style={styles.contentContainer}>
        <View style={styles.titles}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{description}</Text>
        </View>
      </View>
    </View>
  );
};

export default MovieItem;
