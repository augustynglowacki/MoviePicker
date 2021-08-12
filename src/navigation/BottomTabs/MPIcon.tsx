import React from 'react';
import {Image, StyleSheet} from 'react-native';
import Animated, {AnimatedLayout, FlipInXDown} from 'react-native-reanimated';

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
    <AnimatedLayout>
      <Animated.View entering={FlipInXDown.springify().delay(400)}>
        <Image
          source={require('src/assets/images/outlined.png')}
          style={styles.image}
        />
      </Animated.View>
    </AnimatedLayout>
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
