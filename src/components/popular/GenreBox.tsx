import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import palette from 'src/styles/palette';

interface Props {
  name: string;
}

const GenreBox: React.FC<Props> = ({name}) => (
  <View key={name} style={styles.categoryContainer}>
    <Text style={styles.categoryText}>{name}</Text>
  </View>
);

const styles = StyleSheet.create({
  categoryContainer: {
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    backgroundColor: palette.white,
  },
  categoryText: {
    color: palette.darkGrey,
    fontSize: 13,
  },
});

export default GenreBox;
