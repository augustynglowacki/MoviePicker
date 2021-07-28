import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import colors from '../../assets/theme/colors';

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
        selectedColor={colors.primary}
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
    color: colors.primary,
    fontSize: 20,
    marginRight: 10,
    fontWeight: '700',
  },
});
