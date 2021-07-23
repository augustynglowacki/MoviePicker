import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Rating} from 'react-native-ratings';

interface RatingProps {
  voteAverage: number;
}

const RatingBox = ({voteAverage}: RatingProps) => {
  return (
    <View style={styles.ratingWrapper}>
      <Text style={styles.ratingText}>{voteAverage}</Text>
      <Rating
        type="star"
        ratingCount={5}
        imageSize={25}
        tintColor="black"
        startingValue={voteAverage / 2}
        fractions={5}
        readonly={true}
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
