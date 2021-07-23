import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';

interface RatingProps {
  voteAverage: number;
}

const RatingBox = ({voteAverage}: RatingProps) => {
  return (
    <View style={styles.ratingWrapper}>
      <Text style={styles.ratingText}>{voteAverage}</Text>

      <AirbnbRating
        count={5}
        defaultRating={voteAverage / 2}
        size={20}
        isDisabled
        showRating={false}
      />
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
    color: '#F1CB00',
    fontSize: 20,
    marginRight: 10,
    fontWeight: '700',
  },
});
