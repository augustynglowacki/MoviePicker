import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import palette from 'src/styles/palette';
import Star from 'react-native-star-view';
interface Props {
  voteAverage: number;
}

const RatingBox: React.FC<Props> = ({voteAverage}) => {
  const getRoundRating = () => {
    return Math.round(voteAverage) / 2;
  };
  return (
    <View style={styles.ratingWrapper}>
      <Text style={styles.ratingText}>{voteAverage}</Text>
      <Star score={getRoundRating()} style={styles.starStyle} />
    </View>
  );
};

export default RatingBox;

const styles = StyleSheet.create({
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingText: {
    color: palette.primary,
    fontSize: 20,
    fontWeight: '700',
  },
  starStyle: {
    color: palette.primary,
    transform: [{scale: 0.85}],
  },
});
