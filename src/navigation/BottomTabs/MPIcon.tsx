import React from 'react';
import {Image, StyleSheet} from 'react-native';

const MPIcon = (focused: boolean) => {
  if (focused) {
    return (
      <Image
        source={require('src/assets/images/filled.png')}
        style={styles.scale}
      />
    );
  }
  return (
    <Image
      source={require('src/assets/images/outlined.png')}
      style={styles.image}
    />
  );
};

export default MPIcon;

const styles = StyleSheet.create({
  scale: {
    transform: [{scale: 1.15}],
    width: 23,
    height: 23,
  },
  image: {
    width: 23,
    height: 23,
  },
});
