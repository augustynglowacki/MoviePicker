import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const LinearGradientCover = () => (
  <View style={styles.linearWrapper}>
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      colors={['transparent', '#000']}
      style={styles.linearGrandient}
    />
  </View>
);

const styles = StyleSheet.create({
  linearWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  linearGrandient: {
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
});

export default LinearGradientCover;
